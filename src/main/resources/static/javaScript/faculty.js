const apiUrl = window.location.origin + "/faculties"; // Backend API base URL

// Select elements
const facultyTable = document.getElementById("facultyTable");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const facultyModal = document.getElementById("facultyModal");
const facultyForm = document.getElementById("facultyForm");
const searchFacultyBtn = document.getElementById("searchFacultyBtn");
const searchFacultyInput = document.getElementById("searchFacultyInput");

// Helper function to render a table row
function createFacultyRow(faculty) {
    return `
        <tr>
            <td class="border-t py-2 px-4">${faculty.idFaculty}</td>
            <td class="border-t py-2 px-4">${faculty.title}</td>
            <td class="border-t py-2 px-4">${faculty.numberTeacher || ""}</td>
            <td class="border-t py-2 px-4">${faculty.numberStudent || ""}</td>
            <td class="border-t py-2 px-4">
                <button onclick="editFaculty('${faculty.idFaculty}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button onclick="deleteFaculty('${faculty.idFaculty}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </td>
        </tr>
    `;
}

// Fetch and display faculties
async function fetchFaculties() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch faculties.");
        const faculties = await response.json();

        facultyTable.innerHTML = faculties.map(createFacultyRow).join("");
    } catch (error) {
        console.error("Error fetching faculties:", error);
    }
}

// Open modal in create mode
function openModal(mode = "create", faculty = {}) {
    facultyForm.reset();
    facultyForm.dataset.mode = mode;
    document.getElementById("idFaculty").readOnly = mode === "edit";

    if (mode === "edit") {
        // Update modal title and button
        document.getElementById("modalTitle").innerText = "Edit Faculty";
        document.getElementById("modalSubmitBtn").innerText = "Save";
        // Populate form fields
        document.getElementById("idFaculty").value = faculty.idFaculty || "";
        document.getElementById("title").value = faculty.title || "";
        document.getElementById("numberTeacher").value = faculty.numberTeacher || "";
        document.getElementById("numberStudent").value = faculty.numberStudent || "";
    }

    facultyModal.classList.remove("hidden");
}

// Close modal
function closeModal() {
    facultyModal.classList.add("hidden");
}

// Submit form for creating/updating faculty
async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(facultyForm);
    const data = {
        idFaculty: formData.get("idFaculty"),
        title: formData.get("title"),
        numberTeacher: Number(formData.get("numberTeacher")),
        numberStudent: Number(formData.get("numberStudent")),
    };

    const mode = facultyForm.dataset.mode;
    const method = mode === "edit" ? "PUT" : "POST";
    const url = method === "PUT" ? `${apiUrl}/${data.idFaculty}` : apiUrl;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(`Faculty ${mode === "edit" ? "updated" : "created"} successfully!`);
            closeModal();
            fetchFaculties();
        } else {
            throw new Error(`Failed to ${mode === "edit" ? "update" : "create"} faculty.`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while saving the faculty.");
    }
}

// Edit a faculty
function editFaculty(id) {
    const faculty = Array.from(facultyTable.rows).find(
        (row) => row.cells[0].textContent === id
    );
    if (!faculty) return;
    openModal("edit", {
        idFaculty: faculty.cells[0].textContent,
        title: faculty.cells[1].textContent,
        numberTeacher: faculty.cells[2].textContent,
        numberStudent: faculty.cells[3].textContent,
    });
}

// Delete a faculty
async function deleteFaculty(id) {
    if (!confirm("Are you sure you want to delete this faculty?")) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Faculty deleted successfully!");
            fetchFaculties();
        } else {
            throw new Error("Failed to delete faculty.");
        }
    } catch (error) {
        console.error("Error deleting faculty:", error);
        alert("An error occurred while deleting the faculty.");
    }
}

// Search for a specific faculty
async function searchFaculty() {
    const query = searchFacultyInput.value.trim();
    const selectFaculty = document.getElementById("filterFaculty").value;

    if (!query) {
        fetchFaculties();
        return alert("Please enter a search value.");
    }

    try {
        const response = await fetch(window.location.origin + `/faculties/search?filter=${selectFaculty}&query=${encodeURIComponent(query)}`);

        if (response.ok) {
            const facultys = await response.json();

            const facultyTable = document.getElementById("facultyTable");

            facultyTable.innerHTML = "";

            if (facultys.length === 0) {
                facultyTable.innerHTML = `<tr><td colspan="5" class="text-center py-4">No Facultys found.</td></tr>`;
                return;
            }

            facultys.forEach(faculty => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="py-2 px-4">${faculty.idFaculty}</td>
                    <td class="py-2 px-4">${faculty.title}</td>
                    <td class="py-2 px-4">${faculty.numberTeacher}</td>
                    <td class="py-2 px-4">${faculty.numberStudent}</td>
                    <td class="py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded" onclick="editFaculty('${faculty.idFaculty}')">Edit</button>
                        <button class="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded" onclick="deleteFaculty('${faculty.idFaculty}')">Delete</button>
                    </td>
                `;
                facultyTable.appendChild(row);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error searching for faculty:", error);
    }
}

// Event listeners
openModalBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
facultyForm.addEventListener("submit", handleFormSubmit);
searchFacultyBtn.addEventListener("click", searchFaculty);

searchFacultyInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchFaculty();
    }
});

// Initial fetch
fetchFaculties();