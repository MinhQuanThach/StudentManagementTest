const apiUrl = window.location.origin + "/courses"; // Backend API base URL

// Select elements
const courseTable = document.getElementById("courseTable");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const courseModal = document.getElementById("courseModal");
const courseForm = document.getElementById("courseForm");
const searchCourseBtn = document.getElementById("searchCourseBtn");
const searchCourseInput = document.getElementById("searchCourseInput");

// Helper function to render a table row
function createCourseRow(course) {
    return `
        <tr>
            <td class="border-t py-2 px-4">${course.idCourse}</td>
            <td class="border-t py-2 px-4">${course.credits}</td>
            <td class="border-t py-2 px-4">${course.title}</td>
            <td class="border-t py-2 px-4">
                <button onclick="editCourse('${course.idCourse}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button onclick="deleteCourse('${course.idCourse}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </td>
        </tr>
    `;
}

// Fetch and display courses
async function fetchCourses() {
    try {
        const response = await fetch(window.location.origin + '/courses');
        if (!response.ok) throw new Error("Failed to fetch courses.");
        const courses = await response.json();

        courseTable.innerHTML = courses.map(createCourseRow).join("");
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
}

// Open modal in create mode
async function openModal(mode = "create", course = {}) {
    courseForm.reset();
    courseForm.dataset.mode = mode;
    document.getElementById("idCourse").readOnly = mode === "edit";

    if (mode === "edit") {
        // Update modal title and button
        document.getElementById("modalTitle").innerText = "Edit Course";
        document.getElementById("modalSubmitBtn").innerText = "Save";
        // Populate form fields
        document.getElementById("idCourse").value = course.idCourse || "";
        document.getElementById("credits").value = course.credits || "";
        document.getElementById("title").value = course.title || "";
    }

    courseModal.classList.remove("hidden");
}

// Close modal
function closeModal() {
    courseModal.classList.add("hidden");
}

// Submit form for creating/updating course
async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(courseForm);
    const data = {
        idCourse: formData.get("idCourse"),
        credits: Number(formData.get("credits")),
        title: formData.get("title"),
    };

    const mode = courseForm.dataset.mode;
    const method = mode === "edit" ? "PUT" : "POST";
    const url = method === "PUT" ? `${apiUrl}/${data.idCourse}` : apiUrl;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(`Course ${mode === "edit" ? "updated" : "created"} successfully!`);
            closeModal();
            fetchCourses();
        } else {
            throw new Error(`Failed to ${mode === "edit" ? "update" : "create"} course.`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while saving the course.");
    }
}

// Edit a course
function editCourse(id) {
    const course = Array.from(courseTable.rows).find(
        (row) => row.cells[0].textContent === id
    );
    if (!course) return;
    openModal("edit", {
        idCourse: course.cells[0].textContent,
        credits: course.cells[1].textContent,
        title: course.cells[2].textContent,
    });
}

// Delete a course
async function deleteCourse(id) {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Course deleted successfully!");
            fetchCourses();
        } else {
            throw new Error("Failed to delete course.");
        }
    } catch (error) {
        console.error("Error deleting course:", error);
        alert("An error occurred while deleting the course.");
    }
}

// Search for a specific course
async function searchCourse() {
    const query = searchCourseInput.value.trim();
    const selectCourse = document.getElementById("filterCourse").value;

    if (!query) {
        fetchCourses();
        return alert("Please enter a search value.");
    }

    try {
        const response = await fetch(window.location.origin + `/courses/search?filter=${selectCourse}&query=${encodeURIComponent(query)}`);

        if (response.ok) {
            const courses = await response.json();

            const courseTable = document.getElementById("courseTable");

            courseTable.innerHTML = "";

            if (courses.length === 0) {
                courseTable.innerHTML = `<tr><td colspan="5" class="text-center py-4">No courses found.</td></tr>`;
                return;
            }

            courses.forEach(course => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="py-2 px-4">${course.idCourse}</td>
                    <td class="py-2 px-4">${course.credits}</td>
                    <td class="py-2 px-4">${course.title}</td>
                    <td class="py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded" onclick="editCourse('${course.idCourse}')">Edit</button>
                        <button class="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded" onclick="deleteCourse('${course.idCourse}')">Delete</button>
                    </td>
                `;
                courseTable.appendChild(row);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error searching for course:", error);
    }
}

// Event listeners
openModalBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
courseForm.addEventListener("submit", handleFormSubmit);
searchCourseBtn.addEventListener("click", searchCourse);
searchCourseInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchCourse();
    }
});

// Initial fetch
fetchCourses();