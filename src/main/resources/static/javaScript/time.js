const apiUrl = window.location.origin + "/times"; // Backend API base URL

// Select elements
const timeTable = document.getElementById("timeTable");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const timeModal = document.getElementById("timeModal");
const timeForm = document.getElementById("timeForm");
const searchTimeBtn = document.getElementById("searchTimeBtn");
const searchTimeInput = document.getElementById("searchTimeInput");

// Helper function to render a table row
function createTimeRow(time) {
    return `
        <tr>
            <td class="time-id-column">${time.idTime}</td>
            <td class="border-t py-2 px-4">${time.section.idSection}</td>
            <td class="border-t py-2 px-4">${time.day}</td>
            <td class="border-t py-2 px-4">${time.startTime}</td>
            <td class="border-t py-2 px-4">${time.endTime}</td>
            <td class="border-t py-2 px-4">${time.roomNumber || ""}</td>
            <td class="border-t py-2 px-4">
                <button onclick="editTime('${time.idTime}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button onclick="deleteTime('${time.idTime}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </td>
        </tr>
    `;
}

// Fetch and display times
async function fetchTimes() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch times.");
        const times = await response.json();

        timeTable.innerHTML = times.map(createTimeRow).join("");
    } catch (error) {
        console.error("Error fetching times:", error);
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

// Open modal in create mode
async function openModal(mode = "create", time = {}) {
    timeForm.reset();
    timeForm.dataset.mode = mode;

    // List of selection for 'section' label
    const sectionSelect = document.getElementById("section");
    sectionSelect.innerHTML = '<option value="" disabled selected>Select a section</option>'; // Reset options
    const sections = await fetchSectionsForSelection();
    sections.forEach(section => {
        const option = document.createElement("option");
        option.value = section.idSection;
        option.textContent = section.idSection + " (" + section.title + ")";
        sectionSelect.appendChild(option);
    });

    // List of selection for 'day' label
    const daySelect = document.getElementById("day");
    daySelect.innerHTML = '<option value="" disabled selected>Select day</option>'; // Reset options
    const dayOptions = [
        { value: "Thứ 2", text: "Thứ 2" },
        { value: "Thứ 3", text: "Thứ 3" },
        { value: "Thứ 4", text: "Thứ 4" },
        { value: "Thứ 5", text: "Thứ 5" },
        { value: "Thứ 6", text: "Thứ 6" },
        { value: "Thứ 7", text: "Thứ 7" }
    ];
    dayOptions.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.text = option.text;
        daySelect.appendChild(opt);
    });

    if (mode === "edit") {
        // Store idTime in form dataset
        timeForm.dataset.idTime = time.idTime;
        // Update modal title and button
        document.getElementById("modalTitle").innerText = "Edit Time";
        document.getElementById("modalSubmitBtn").innerText = "Save";
        // Populate form fields
        document.getElementById("section").value = time.section?.idSection || "";
        document.getElementById("day").value = time.day || "";
        document.getElementById("startTime").value = time.startTime || "";
        document.getElementById("endTime").value = time.endTime || "";
        document.getElementById("roomNumber").value = time.roomNumber || "";
    }

    timeModal.classList.remove("hidden");
}

// Close modal
function closeModal() {
    timeModal.classList.add("hidden");
}

// Submit form for creating/updating time
async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(timeForm);
    const mode = timeForm.dataset.mode;
    const data = {
        section: { idSection: formData.get("section") },
        day: formData.get("day"),
        startTime: formData.get("startTime"),
        endTime: formData.get("endTime"),
        roomNumber: formData.get("roomNumber"),
    };

    if (mode === "edit") {
        // Include idTime only in edit mode
        data.idTime = timeForm.dataset.idTime;
    }

    const method = mode === "edit" ? "PUT" : "POST";
    const url = method === "PUT" ? `${apiUrl}/${data.idTime}` : apiUrl;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(`Time ${mode === "edit" ? "updated" : "created"} successfully!`);
            closeModal();
            fetchTimes();
        } else {
            throw new Error(`Failed to ${mode === "edit" ? "update" : "create"} time.`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while saving the time.");
    }
}

// Edit a time
function editTime(id) {
    const time = Array.from(timeTable.rows).find(
        (row) => row.cells[0].textContent === id
    );
    if (!time) return;
    openModal("edit", {
        idTime: time.cells[0].textContent,
        section: { idSection: time.cells[1].textContent },
        day: time.cells[2].textContent,
        startTime: time.cells[3].textContent,
        endTime: time.cells[4].textContent,
        roomNumber: time.cells[5].textContent,
    });
}

// Delete a time
async function deleteTime(id) {
    if (!confirm("Are you sure you want to delete this time?")) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Time deleted successfully!");
            fetchTimes();
        } else {
            throw new Error("Failed to delete time.");
        }
    } catch (error) {
        console.error("Error deleting time:", error);
        alert("An error occurred while deleting the time.");
    }
}

// Search for a specific time
async function searchTime() {
    const query = document.getElementById("searchTimeInput").value.trim();
    const selectTime = document.getElementById("filterTime").value;

    if (!query) {
        return alert("Please enter a search value.");
    }

    try {
        // Construct the API endpoint for search based on the filter selected
        const response = await fetch(window.location.origin + `/times/search?type=${selectTime}&query=${encodeURIComponent(query)}`);

        if (response.ok) {
            const times = await response.json();
            // Clear the table before rendering search results
            timeTable.innerHTML = "";
            // If no results found, display a message
            if (times.length === 0) {
                timeTable.innerHTML = `<tr><td colspan="7" class="text-center py-4">No times found.</td></tr>`;
                return;
            }
            // Render the search results
            times.forEach(time => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="py-2 px-4">${time.section.idSection}</td>
                    <td class="py-2 px-4">${time.day}</td>
                    <td class="py-2 px-4">${time.startTime}</td>
                    <td class="py-2 px-4">${time.endTime}</td>
                    <td class="py-2 px-4">${time.roomNumber || ""}</td>
                    <td class="py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded" onclick="editTime('${time.idTime}')">Edit</button>
                        <button class="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded" onclick="deleteTime('${time.idTime}')">Delete</button>
                    </td>
                `;
                timeTable.appendChild(row);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error searching for time:", error);
        alert("An error occurred while searching for time.");
    }
}


// Event listeners
openModalBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
timeForm.addEventListener("submit", handleFormSubmit);
searchTimeBtn.addEventListener("click", searchTime);

// Initial fetch
fetchTimes();

function handleTimeEnter(event) {
    if (event.key === "Enter") {
        searchTime();
    }
}

searchTimeInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchTime();
    }
});