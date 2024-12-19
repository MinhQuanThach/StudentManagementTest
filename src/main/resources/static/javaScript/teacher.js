// URL của API
const apiUrl = window.location.origin + '/teachers';

async function loadTeachers() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const teachers = await response.json();

        const teacherTable = document.getElementById('teacherTable');
        teacherTable.innerHTML = '';
        teachers.forEach((teacher) => {
            const row = document.createElement('tr');

            row.innerHTML = `
        <td class="py-2 px-4">${teacher.idTeacher}</td>
        <td class="py-2 px-4">${teacher.email}</td>
        <td class="py-2 px-4">${teacher.name}</td>
        <td class="py-2 px-4">${teacher.birthday || ""}</td>
        <td class="py-2 px-4">
                <button onclick="editTeacher('${teacher.idTeacher}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button onclick="deleteTeacher('${teacher.idTeacher}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
        </td>
      `;

            teacherTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading teachers:', error);
    }
}

async function deleteTeacher(teacherId) {
    const confirmDelete = confirm(`Are you sure you want to delete teacher with ID: ${teacherId}?`);
    if (!confirmDelete) {
        return;
    }
    try {
        const response = await fetch(`/teachers/${teacherId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert(`Teacher with ID: ${teacherId} has been deleted.`);
            loadTeachers();
        } else {
            alert('Error deleting teacher');
        }
    } catch (error) {
        console.error('Error deleting teacher:', error);
        alert('An error occurred while deleting the teacher');
    }
}


// Hàm gọi khi chỉnh sửa giáo viên
function editTeacher(id) {
    const teacherRow = Array.from(teacherTable.rows).find(
        (row) => row.cells[0].textContent === id
    );
    if (!teacherRow) return;

    openModal("edit", {
        idTeacher: teacherRow.cells[0].textContent,
        email: teacherRow.cells[1].textContent,
        name: teacherRow.cells[2].textContent,
        birthday: teacherRow.cells[3].textContent,
    });

}

function openModal(mode, teacher) {
    const modal = document.getElementById("TeacherModal");
    const modalTitle = document.getElementById("modalTitle");
    const form = document.getElementById("teacherForm");

    modal.classList.remove("hidden");
    modalTitle.textContent = mode === "edit" ? "Edit Teacher" : "Create New Teacher";

    if (mode === "edit") {
        document.getElementById("idTeacher").value = teacher.idTeacher;
        document.getElementById("email").value = teacher.email;
        document.getElementById("name").value = teacher.name;
        document.getElementById("title").value = teacher.birthday;
    } else {
        document.getElementById("teacherForm").reset();
    }

    form.onsubmit = async (event) => {
        event.preventDefault();
        if (mode === "edit") {
            await updateTeacher(teacher.idTeacher);
        } else {
            await createTeacher();
        }
    };
}

function updateTeacher(idTeacher) {

    const teacherData = {
        idTeacher: document.getElementById("idTeacher").value,
        email: document.getElementById("email").value,
        name: document.getElementById("name").value,
        birthday: document.getElementById("title").value
    };

    const url = window.location.origin + `/teachers/${idTeacher}`;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacherData)
    })
        .then(response => {
            if (response.ok) {
                closeModal();
                return response.json();
            } else {
                throw new Error('Failed to update teacher');
            }
        })
        .then(updatedTeacher => {
            console.log('Updated teacher:', updatedTeacher);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function createTeacher() {

    const maxId = await getMaxTeacherId();

    alert(maxId);
    const teacherData = {
        idTeacher: maxId + 1,
        email: document.getElementById("email").value,
        name: document.getElementById("name").value,
        birthday: document.getElementById("title").value
    };

    const url = window.location.origin + `/teachers`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacherData)
    })
        .then(response => {
            if (response.ok) {
                closeModal();
                return response.json();
            } else {
                throw new Error('Failed to create teacher');
            }
        })
        .then(newTeacher => {
            console.log('Created new teacher:', newTeacher);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    loadTeachers();
}

async function getMaxTeacherId() {
    try {
        const response = await fetch(window.location.origin + '/teachers');

        if (!response.ok) {
            throw new Error('Failed to fetch teachers');
        }

        const teachers = await response.json();

        if (teachers.length === 0) {
            console.log("No teachers found. Starting from ID 1.");
            return 1;
        }

        const maxId = teachers.reduce((max, teacher) => {
            return Math.max(max, teacher.idTeacher);
        }, 0);

        console.log("Max Teacher ID:", maxId);
        return maxId;
    } catch (error) {
        console.error('Error:', error);
    }
}


// Đóng modal
function closeModal() {
    loadTeachers();
    const modal = document.getElementById("TeacherModal");
    modal.classList.add("hidden");
}

async function searchTeacher() {
    const query = document.getElementById("searchIndustryInput").value.trim();
    const selectTeacher = document.getElementById("filterSelectTeacher").value;

    if (!query) return alert("Please enter a search value.");

    try {
        const response = await fetch(window.location.origin + `/teachers/search?type=${selectTeacher}&query=${encodeURIComponent(query)}`);

        if (response.ok) {
            const teachers = await response.json();

            const teacherTable = document.getElementById("teacherTable");

            teacherTable.innerHTML = "";

            if (teachers.length === 0) {
                teacherTable.innerHTML = `<tr><td colspan="5" class="text-center py-4">No teachers found.</td></tr>`;
                return;
            }

            teachers.forEach(teacher => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="py-2 px-4">${teacher.idTeacher}</td>
                    <td class="py-2 px-4">${teacher.email}</td>
                    <td class="py-2 px-4">${teacher.name}</td>
                    <td class="py-2 px-4">${teacher.birthday}</td>
                    <td class="py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded" onclick="editTeacher('${teacher.idTeacher}')">Edit</button>
                        <button class="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded" onclick="deleteTeacher('${teacher.idTeacher}')">Delete</button>
                    </td>
                `;
                teacherTable.appendChild(row);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error searching for teacher:", error);
    }
}



document.addEventListener('DOMContentLoaded', loadTeachers);
document.getElementById("openModalBtn").addEventListener("click", function() {
    openModal("create");
});

document.getElementById("searchIndustryBtn").addEventListener("click", searchTeacher);

function handleEnter(event) {
    if (event.key === "Enter") {
        searchTeacher();
    }
}