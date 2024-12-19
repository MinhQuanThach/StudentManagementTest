document.addEventListener("DOMContentLoaded", () => {
    const teachTable = document.getElementById("teachTable");
    const teachForm = document.getElementById("teachForm");
    const modalTitle = document.getElementById("modalTitle");
    const modalSubmitBtn = document.getElementById("modalSubmitBtn");
    const idTeacherSelect = document.getElementById("idTeacher");
    const idSectionSelect = document.getElementById("idSection");
    const teachModal = document.getElementById("teachModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const searchTeachInput = document.getElementById("searchTeachInput");
    const searchTeachBtn = document.getElementById("searchTeachBtn");

    // Fetch and display teaches data
    const fetchTeaches = async () => {
        try {
            const response = await fetch("/teaches");
            const teaches = await response.json();

            teachTable.innerHTML = ""; // Clear existing rows

            teaches.forEach((teach) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td class="py-2 px-4">${teach.teacher.idTeacher}</td>
                    <td class="py-2 px-4">${teach.teacher.name}</td>
                    <td class="py-2 px-4">${teach.teacher.birthday}</td>
                    <td class="py-2 px-4">${teach.section.idSection}</td>
                    <td class="py-2 px-4">
                        <button class="delete-btn bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded" data-id-teacher="${teach.teacher.idTeacher}" data-id-section="${teach.section.idSection}">Delete</button>
                    </td>
                `;

                teachTable.appendChild(row);
            });

            addDeleteHandlers();
        } catch (error) {
            console.error("Error fetching teaches:", error);
        }
    };

    // Fetch teachers and sections for select options
    const fetchSelectOptions = async () => {
        try {
            const [teachersResponse, sectionsResponse] = await Promise.all([
                fetch("/teachers"),
                fetch("/sections"),
            ]);

            const teachers = await teachersResponse.json();
            const sections = await sectionsResponse.json();

            idTeacherSelect.innerHTML = '<option value="" disabled selected>Select a teacher</option>';
            idSectionSelect.innerHTML = '<option value="" disabled selected>Select a section</option>';

            teachers.forEach((teacher) => {
                const option = document.createElement("option");
                option.value = teacher.idTeacher;
                option.textContent = `${teacher.idTeacher} - ${teacher.name}`;
                idTeacherSelect.appendChild(option);
            });

            sections.forEach((section) => {
                const option = document.createElement("option");
                option.value = section.idSection;
                option.textContent = section.idSection;
                idSectionSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    // Add event listeners to delete buttons
    const addDeleteHandlers = () => {
        const deleteButtons = document.querySelectorAll(".delete-btn");

        deleteButtons.forEach((button) => {
            button.addEventListener("click", async () => {
                if (!confirm("Are you sure you want to delete this teach?")) return;
                const idTeacher = button.getAttribute("data-id-teacher");
                const idSection = button.getAttribute("data-id-section");

                try {
                    const response = await fetch(`/teaches/${idTeacher}/${idSection}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        fetchTeaches();
                    } else {
                        console.error("Failed to delete teach:", await response.text());
                    }
                } catch (error) {
                    console.error("Error deleting teach:", error);
                }
            });
        });
    };

    // Show modal
    openModalBtn.addEventListener("click", () => {
        teachForm.reset();
        modalTitle.textContent = "Create New Teach";
        modalSubmitBtn.textContent = "Create";
        teachModal.classList.remove("hidden");
        fetchSelectOptions();
    });

    // Close modal
    closeModalBtn.addEventListener("click", () => {
        teachModal.classList.add("hidden");
    });

    // Handle form submission
    teachForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(teachForm);
        const idTeacher = formData.get("idTeacher");
        const idSection = formData.get("idSection");

        try {
            const response = await fetch("/teaches", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: {
                        idTeacher: idTeacher,
                        idSection: idSection,
                    },
                    teacher: {idTeacher: idTeacher},
                    section: {idSection: idSection},
                }),
            });

            if (response.ok) {
                fetchTeaches();
                teachModal.classList.add("hidden");
            } else {
                console.error("Failed to create teach:", await response.text());
            }
        } catch (error) {
            console.error("Error creating teach:", error);
        }
    });

    // Handle search
    searchTeachBtn.addEventListener("click", async () => {
        const searchQuery = searchTeachInput.value;

        if (!searchQuery) {
            fetchTeaches();
            return;
        }

        try {
            const response = await fetch(`/teaches/search?id=${searchQuery}`);
            const teaches = await response.json();

            teachTable.innerHTML = "";

            teaches.forEach((teach) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td class="py-2 px-4">${teach.teacher.idTeacher}</td>
                    <td class="py-2 px-4">${teach.teacher.name}</td>
                    <td class="py-2 px-4">${teach.teacher.birthday}</td>
                    <td class="py-2 px-4">${teach.section.idSection}</td>
                    <td class="py-2 px-4">
                        <button class="delete-btn bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded" data-id-teacher="${teach.teacher.idTeacher}" data-id-section="${teach.section.idSection}">Delete</button>
                    </td>
                `;

                teachTable.appendChild(row);
            });

            addDeleteHandlers();
        } catch (error) {
            console.error("Error searching teaches:", error);
        }
    });

    // Initial fetch of teaches data
    fetchTeaches();
});
