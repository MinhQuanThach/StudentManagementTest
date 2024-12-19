const apiUrl = window.location.origin + "/sections"; // Backend API base URL

// Select elements
const sectionTable = document.getElementById("sectionTable");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const sectionModal = document.getElementById("sectionModal");
const sectionForm = document.getElementById("sectionForm");
const searchSectionBtn = document.getElementById("searchSectionBtn");
const searchSectionInput = document.getElementById("searchSectionInput");

// Helper function to render a table row
function createSectionRow(section) {
    return `
        <tr>
            <td class="border-t py-2 px-4">${section.idSection}</td>
            <td class="border-t py-2 px-4">${section.course.idCourse}</td>
            <td class="border-t py-2 px-4">${section.semester}</td>
            <td class="border-t py-2 px-4">${section.year}</td>
            <td class="border-t py-2 px-4">
                <button onclick="editSection('${section.idSection}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button onclick="deleteSection('${section.idSection}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </td>
        </tr>
    `;
}

// Fetch and display sections
async function fetchSections() {
    try {
        const response = await fetch(window.location.origin + '/sections');
        if (!response.ok) throw new Error("Failed to fetch sections.");
        const sections = await response.json();

        sectionTable.innerHTML = sections.map(createSectionRow).join("");
    } catch (error) {
        console.error("Error fetching sections:", error);
    }
}

async function fetchCoursesForSelection() {
    try {
        const response = await fetch(window.location.origin + "/courses");
        if (!response.ok) {
            throw new Error("Failed to fetch courses");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
}

// Open modal in create mode
async function openModal(mode = "create", section = {}) {
    sectionForm.reset();
    sectionForm.dataset.mode = mode;
    document.getElementById("idSection").readOnly = mode === "edit";

    // Fetch and populate course options
    const courseSelect = document.getElementById("course");
    courseSelect.innerHTML = '<option value="" disabled selected>Select a course</option>'; // Reset options
    const courses = await fetchCoursesForSelection();
    courses.forEach(course => {
        const option = document.createElement("option");
        option.value = course.idCourse;
        option.textContent = course.title + " (" + course.idCourse + ")";
        courseSelect.appendChild(option);
    });

    if (mode === "edit") {
        // Update modal title and button
        document.getElementById("modalTitle").innerText = "Edit Section";
        document.getElementById("modalSubmitBtn").innerText = "Save";
        // Populate form fields
        document.getElementById("idSection").value = section.idSection || "";
        document.getElementById("course").value = section.course?.idCourse || "";
        document.getElementById("semester").value = section.semester || "";
        document.getElementById("year").value = section.year || "";
    }

    sectionModal.classList.remove("hidden");
}

// Close modal
function closeModal() {
    sectionModal.classList.add("hidden");
}

// Submit form for creating/updating section
async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(sectionForm);
    const data = {
        idSection: formData.get("idSection"),
        course: { idCourse: formData.get("course") },
        semester: formData.get("semester"),
        year: Number(formData.get("year")),
    };

    const mode = sectionForm.dataset.mode;
    const method = mode === "edit" ? "PUT" : "POST";
    const url = method === "PUT" ? `${apiUrl}/${data.idSection}` : apiUrl;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(`Section ${mode === "edit" ? "updated" : "created"} successfully!`);
            closeModal();
            fetchSections();
        } else {
            throw new Error(`Failed to ${mode === "edit" ? "update" : "create"} section.`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while saving the section.");
    }
}

// Edit a section
function editSection(id) {
    const section = Array.from(sectionTable.rows).find(
        (row) => row.cells[0].textContent === id
    );
    if (!section) return;
    openModal("edit", {
        idSection: section.cells[0].textContent,
        course: { idCourse: section.cells[1].textContent },
        semester: section.cells[2].textContent,
        year: section.cells[3].textContent,
    });
}

// Delete a section
async function deleteSection(id) {
    if (!confirm("Are you sure you want to delete this section?")) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Section deleted successfully!");
            fetchSections();
        } else {
            throw new Error("Failed to delete section.");
        }
    } catch (error) {
        console.error("Error deleting section:", error);
        alert("An error occurred while deleting the section.");
    }
}

// Search for a specific section
async function searchSection() {
    const query = searchSectionInput.value.trim();
    const selectSection = document.getElementById("filterSection").value;

    if (!query) {
        fetchSections();
        return alert("Please enter a search value.");
    }

    try {
        const response = await fetch(window.location.origin + `/sections/search?type=${selectSection}&query=${encodeURIComponent(query)}`);

        if (response.ok) {
            const sections = await response.json();

            const courseSection = document.getElementById("sectionTable");

            sectionTable.innerHTML = "";

            if (sections.length === 0) {
                sectionTable.innerHTML = `<tr><td colspan="5" class="text-center py-4">No sections found.</td></tr>`;
                return;
            }

            sections.forEach(section => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="py-2 px-4">${section.idSection}</td>
                    <td class="py-2 px-4">${section.course.idCourse}</td>
                    <td class="py-2 px-4">${section.semester}</td>
                    <td class="py-2 px-4">${section.year}</td>
                    <td class="py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded" onclick="editSection('${section.idSection}')">Edit</button>
                        <button class="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded" onclick="deleteSection('${section.idSection}')">Delete</button>
                    </td>
                `;
                sectionTable.appendChild(row);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error searching for section:", error);
    }
}

// Event listeners
openModalBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
sectionForm.addEventListener("submit", handleFormSubmit);
searchSectionBtn.addEventListener("click", searchSection);
searchSectionInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchSection();
    }
});

// Initial fetch
fetchSections();