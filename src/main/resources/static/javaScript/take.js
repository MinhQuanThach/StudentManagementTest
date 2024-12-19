const apiUrl = window.location.origin + "/takes"; // Backend API base URL

// Select elements
const takeTable = document.getElementById("takeTable");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const takeModal = document.getElementById("takeModal");
const takeForm = document.getElementById("takeForm");
const searchTakeBtn = document.getElementById("searchTakeBtn");
const searchTakeInput = document.getElementById("searchTakeInput");

// Helper function to render a table row
function createTakeRow(take) {
    return `
        <tr>
            <td class="border-t py-2 px-4">${take.idTake.idStudent}</td>
            <td class="border-t py-2 px-4">${take.idTake.idSection}</td>
            <td class="border-t py-2 px-4">${take.status}</td>
            <td class="border-t py-2 px-4">${take.year || ""}</td>
            <td class="border-t py-2 px-4">${take.grade || ""}</td>
            <td class="border-t py-2 px-4">
                <button onclick="editTake(${take.idTake.idStudent}, '${take.idTake.idSection}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button onclick="deleteTake(${take.idTake.idStudent}, '${take.idTake.idSection}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </td>
        </tr>
    `;
}

// Fetch and display takes
async function fetchTakes() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch takes.");
        const takes = await response.json();

        takeTable.innerHTML = takes.map(createTakeRow).join("");
    } catch (error) {
        console.error("Error fetching takes:", error);
    }
}

async function fetchSectionsForSelection() {
    try {
        const response = await fetch(window.location.origin + "/sections");
        if (!response.ok) {
            throw new Error("Failed to fetch sections");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching sections:", error);
        return [];
    }
}

// Open modal in create/edit mode
async function openModal(mode = "create", take = {}) {
    takeForm.reset();
    takeForm.dataset.mode = mode;
    document.getElementById("student").readOnly = mode === "edit";
    if (mode === "edit") {
        document.getElementById("section").classList.add("readonly");
    }

    // List of selection for 'section' label
    const sectionSelect = document.getElementById("section");
    sectionSelect.innerHTML = '<option value="" disabled selected>Select a section</option>'; // Reset options
    const sections = await fetchSectionsForSelection();
    sections.forEach(section => {
        const option = document.createElement("option");
        option.value = section.idSection;
        option.textContent = section.idSection;
        sectionSelect.appendChild(option);
    });

    // List of selection for 'status' label
    const statusSelect = document.getElementById("status");
    statusSelect.innerHTML = '<option value="" disabled selected>Select status</option>'; // Reset options
    const statusOptions = [
        { value: "Học lần đầu", text: "Học lần đầu" },
        { value: "Học cải thiện", text: "Học cải thiện" },
        { value: "Học lại", text: "Học lại" },
        { value: "Hoàn thành", text: "Hoàn thành" }
    ];
    statusOptions.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.text = option.text;
        statusSelect.appendChild(opt);
    });

    if (mode === "edit") {
        // Store composite key in form dataset
        takeForm.dataset.idStudent = take.idTake.idStudent;
        takeForm.dataset.idSection = take.idTake.idSection;

        // Update modal title and button
        document.getElementById("modalTitle").innerText = "Edit Take";
        document.getElementById("modalSubmitBtn").innerText = "Save";

        // Populate form fields
        document.getElementById("student").value = take.idTake.idStudent || "";
        document.getElementById("section").value = take.idTake.idSection || "";
        document.getElementById("status").value = take.status || "";
        document.getElementById("year").value = take.year || "";
        document.getElementById("grade").value = take.grade || "";
    }

    takeModal.classList.remove("hidden");
}

// Close modal
function closeModal() {
    takeModal.classList.add("hidden");
}

// Submit form for creating/updating take
async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(takeForm);
    const mode = takeForm.dataset.mode;
    const data = {
        idTake: {
            idStudent: Number(formData.get("student")),
            idSection: formData.get("section")
        },
        student: {id: Number(formData.get("student"))},
        section: {idSection: formData.get("section")},
        status: formData.get("status"),
        year: Number(formData.get("year")),
        grade: Number(formData.get("grade")),
    };

    const method = mode === "edit" ? "PUT" : "POST";
    const url = mode === "edit" ? `${apiUrl}/${data.idTake.idStudent}/${data.idTake.idSection}` : apiUrl;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(`Take ${mode === "edit" ? "updated" : "created"} successfully!`);
            closeModal();
            fetchTakes();
        } else {
            throw new Error(`Failed to ${mode === "edit" ? "update" : "create"} take.`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while saving the take.");
    }
}

// Edit a take
function editTake(idStudent, idSection) {
    const row = Array.from(takeTable.rows).find(
        (row) => row.cells[0].textContent === String(idStudent) && row.cells[1].textContent === idSection
    );
    if (!row) return;
    openModal("edit", {
        idTake: { idStudent, idSection },
        status: row.cells[2].textContent,
        year: row.cells[3].textContent,
        grade: row.cells[4].textContent,
    });
}

// Delete a take
async function deleteTake(idStudent, idSection) {
    if (!confirm("Are you sure you want to delete this take?")) return;

    try {
        const response = await fetch(`${apiUrl}/${idStudent}/${idSection}`, { method: "DELETE" });

        if (response.ok) {
            alert("Take deleted successfully!");
            fetchTakes();
        } else {
            throw new Error("Failed to delete take.");
        }
    } catch (error) {
        console.error("Error deleting take:", error);
        alert("An error occurred while deleting the take.");
    }
}

// Event listeners
openModalBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
takeForm.addEventListener("submit", handleFormSubmit);
searchTakeBtn.addEventListener("click", searchTake);

searchTakeInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchTake();
    }
});

// Initial fetch
fetchTakes();



// Search for a specific take
async function searchTake() {
    const query = searchTakeInput.value.trim();
    const selectTake = document.getElementById("filterTake").value;

    if (!query) return alert("Please enter a search value.");

    try {
        const response = await fetch(window.location.origin + `/takes/search?filter=${selectTake}&query=${encodeURIComponent(query)}`);

        if (response.ok) {
            const takes = await response.json();
            const takeTable = document.getElementById("takeTable");
            takeTable.innerHTML = "";
            if (takes.length === 0) {
                takeTable.innerHTML = `<tr><td colspan="5" class="text-center py-4">No takes found.</td></tr>`;
                return;
            }
            takes.forEach(take => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="py-2 px-4">${take.student.id}</td>
                    <td class="py-2 px-4">${take.section.idSection}</td>
                    <td class="py-2 px-4">${take.status}</td>
                    <td class="py-2 px-4">${take.year}</td>
                    <td class="py-2 px-4">${take.grade}</td>
                    <td class="py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded" onclick="editTake('${take.idTake}')">Edit</button>
                        <button class="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded" onclick="deleteTake('${take.idTake}')">Delete</button>
                    </td>
                `;
                takeTable.appendChild(row);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error searching for take:", error);
    }
}