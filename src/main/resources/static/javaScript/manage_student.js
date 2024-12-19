
async function searchStudents() {
    const query = document.getElementById("email").value.trim(); // Lấy giá trị từ ô tìm kiếm
    const filter = document.getElementById("filterSelect").value; // Lấy giá trị từ ô chọn filter

    if (!query) {
        alert("Please enter a search term.");
        return;
    }
    try {
        const response = await fetch(`/students/find?filter=${encodeURIComponent(filter)}&query=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error("Failed to fetch students");
        }

        const students = await response.json();

        if (!Array.isArray(students) || students.length === 0) {
            alert("No students found matching the search criteria.");
            return;
        }

        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        students.forEach(student => {
            const row = `
                <tr>
                    <td class="border-t py-2 px-4">${student.id}</td>
                    <td class="border-t py-2 px-4">${student.name}</td>
                    <td class="border-t py-2 px-4">${student.birthday || "N/A"}</td>
                    <td class="border-t py-2 px-4">${student.credits || 0}</td>
                    <td class="border-t py-2 px-4">${student.idClass || "N/A"}</td>
                    <td class="border-t py-2 px-4">${student.industry.idIndustry || "N/A"}</td>
                    <td class="border-t py-2 px-4">
                        <button 
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                            onclick="editStudent(${student.id})">
                            Edit
                        </button>
                        <button 
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onclick="deleteStudent(${student.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
            tbody.insertAdjacentHTML("beforeend", row);
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to fetch students. Please try again later.");
    }
}


function editStudent(studentId) {

    fetch(`/students/${studentId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Student not found');
            }
            return response.json();
        })
        .then(studentData => {
            document.getElementById("studentId").value = studentData.id;
            document.getElementById("name").value = studentData.name;
            if (studentData.birthday) {
                const dob = studentData.birthday; // Sử dụng đúng tên trường
                document.getElementById("dob").value = dob;
            } else {
                console.error("Date of birth not found.");
                document.getElementById("dob").value = "";
            }



            document.getElementById("credits").value = studentData.credits;
            document.getElementById("idClass").value = studentData.idClass;
            document.getElementById("industry").value = studentData.industry.idIndustry;

            // Hiển thị modal
            document.getElementById("editStudentModal").classList.remove("hidden");
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
            alert('Failed to load student data.');
        });
}

function closeEditModal() {
    document.getElementById("editStudentModal").classList.add("hidden");
    fetchAllStudents();
}

document.getElementById("editStudentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const updatedStudent = {
        id: document.getElementById("studentId").value,
        name: document.getElementById("name").value,
        birthday: document.getElementById("dob").value,
        credits: document.getElementById("credits").value,
        idClass: document.getElementById("idClass").value,
        industry: document.getElementById("industry").value,
    };

    const requestBody = JSON.stringify({
        id: updatedStudent.id,
        name: updatedStudent.name,
        birthday: updatedStudent.birthday,
        credits : updatedStudent.credits,
        idClass: updatedStudent.idClass,
        industry: {
            idIndustry: updatedStudent.industry,
        },
    });

    fetch(window.location.origin + `/students/${updatedStudent.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: requestBody,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update student');
            }
            return response.json();
        })
        .then(updatedData => {
            closeEditModal();

            fetchAllStudents();
        })
        .catch(error => {
            console.error('Error updating student:', error);
        });
});



async function deleteStudent(studentId) {
    const confirmDelete = confirm(`Are you sure you want to delete student with ID: ${studentId}?`);
    if (confirmDelete) {
        try {
            // Gửi yêu cầu DELETE tới API
            const response = await fetch(window.location.origin + `/students/students/${studentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert(`Student with ID: ${studentId} has been deleted.`);

                const row = document.querySelector(`#student-row-${studentId}`);
                if (row) {
                    row.remove();
                }
            } else {
                alert('Failed to delete the student. Please try again later.');
            }
        } catch (error) {
            console.error('Error during student deletion:', error);
            alert('An error occurred while deleting the student. Please try again.');
        }
    }
}


document.querySelector("button.bg-slate-300").addEventListener("click", searchStudents);

document.querySelectorAll("button.bg-red-500").forEach(button => {
    button.addEventListener("click", function() {
        const studentId = this.getAttribute("data-id");
        deleteStudent(studentId);
    });
});


document.getElementById("email").addEventListener("keypress", event => {
    if (event.key === "Enter") {
        searchStudents();
    }
});

// Hàm để hiển thị tất cả sinh viên
async function fetchAllStudents() {
    try {
        const response = await fetch(window.location.origin + '/students');

        if (!response.ok) {
            throw new Error("Failed to load Student. Please try again!");
        }

        const students = await response.json();

        if (!Array.isArray(students) || students.length === 0) {
            alert("No students found.");
            return;
        }

        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        students.forEach(student => {
            const row = `
                <tr>
                    <td class="border-t py-2 px-4">${student.id}</td>
                    <td class="border-t py-2 px-4">${student.name}</td>
                    <td class="border-t py-2 px-4">${student.birthday || "N/A"}</td>
                    <td class="border-t py-2 px-4">${student.credits || 0}</td>
                    <td class="border-t py-2 px-4">${student.idClass || "N/A"}</td>
                    <td class="border-t py-2 px-4">${student.industry.idIndustry || "N/A"}</td>
                    <td class="border-t py-2 px-4">
                        <button 
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                            onclick="editStudent(${student.id})">
                            Edit
                        </button>
                        <button 
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onclick="deleteStudent(${student.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
            tbody.insertAdjacentHTML("beforeend", row);
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to fetch students. Please try again later.");
    }
}

document.addEventListener('DOMContentLoaded', fetchAllStudents);
