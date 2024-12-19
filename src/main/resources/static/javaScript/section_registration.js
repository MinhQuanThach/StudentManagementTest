document.addEventListener("DOMContentLoaded", function () {
    const currentUserId = localStorage.getItem("currentUserId"); // Retrieve the current user's ID

    const semesterDropdown = document.getElementById("semester");
    const yearDropdown = document.getElementById("year");
    const sectionTableBody = document.getElementById("sectionTableBody");
    const registrationTable = document.getElementById("registrationTable");
    const totalCreditsCell = document.getElementById("totalCredits");

    let registeredSections = []; // Store registered sections for conflict checks

    loadSemesterAndYear();

    semesterDropdown.addEventListener("change", loadSections);
    yearDropdown.addEventListener("change", loadSections);

    /**
     * Load semesters and years dynamically and ensure no duplicate years.
     */
    async function loadSemesterAndYear() {
        try {
            const response = await fetch(window.location.origin + "/sections");
            if (!response.ok) throw new Error("Failed to fetch sections");

            const semesterOptions = ["Học kỳ I", "Học kỳ II", "Học kỳ phụ"];
            semesterDropdown.innerHTML = `<option value="" disabled selected>Select semester</option>
                                      ${semesterOptions.map(option => `<option value="${option}">${option}</option>`).join('')}`;

            const yearData = await response.json();
            const uniqueYears = [...new Set(yearData.map(section => section.year))]; // Lọc năm học duy nhất
            yearDropdown.innerHTML = `<option value="" disabled selected>Select year</option>
                                  ${uniqueYears.map(year => `<option value="${year}">${year}</option>`).join('')}`;
        } catch (error) {
            console.error("Error fetching sections:", error);
        }
    }


    /**
     * Fetch and display available sections based on selected semester and year.
     */
    function loadSections() {
        const selectedSemester = semesterDropdown.value;
        const selectedYear = yearDropdown.value;

        if (!selectedSemester || !selectedYear) return;

        fetch(`/section_available/${selectedSemester}/${selectedYear}`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to load sections.");
                return response.json();
            })
            .then(sections => renderSections(sections))
            .catch(error => {
                console.error("Error fetching sections:", error);
                sectionTableBody.innerHTML = `<tr><td colspan="9" class="text-center text-red-500">No sections found.</td></tr>`;
            });
    }

    /**
     * Render sections and handle conflict checks.
     */
    function renderSections(sections) {
        sectionTableBody.innerHTML = ""; // Clear previous rows
        if (sections.length === 0) {
            sectionTableBody.innerHTML = `<tr><td colspan="9" class="text-center">No sections available.</td></tr>`;
            return;
        }

        sections.forEach(section => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2 border">${section.sectionId}</td>
                <td class="px-4 py-2 border">${section.courseTitle}</td>
                <td class="px-4 py-2 border">${section.credits}</td>
                <td class="px-4 py-2 border">${section.teacherName}</td>
                <td class="px-4 py-2 border">${section.day}</td>
                <td class="px-4 py-2 border">${section.startTime}</td>
                <td class="px-4 py-2 border">${section.endTime}</td>
                <td class="px-4 py-2 border">${section.roomNumber}</td>
                <td class="px-4 py-2 border text-center">
                    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded add-section-btn"
                            data-section='${JSON.stringify(section)}'>
                        Add
                    </button>
                </td>
            `;
            sectionTableBody.appendChild(row);
        });

        // Add event listeners for "Add" buttons
        document.querySelectorAll(".add-section-btn").forEach(button => {
            button.addEventListener("click", handleAddSection);
        });
    }

    /**
     * Add a section to the registration table, checking for time and day conflicts.
     */
    async function handleAddSection(event) {
        const isLatest = await isLatestSemester(year, semester);
        const button = event.target;
        const section = JSON.parse(button.dataset.section);

        if (checkConflict(section)) {
            alert("Cannot add section due to a time conflict or course duplicate.");
            return;
        }

        // Add to registration table
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="px-4 py-2 border">${section.sectionId}</td>
            <td class="px-4 py-2 border">${section.courseTitle}</td>
            <td class="px-4 py-2 border">${section.credits}</td>
            <td class="px-4 py-2 border">${section.teacherName}</td>
            <td class="px-4 py-2 border">${section.day}</td>
            <td class="px-4 py-2 border">${section.startTime}</td>
            <td class="px-4 py-2 border">${section.endTime}</td>
            <td class="px-4 py-2 border">${section.roomNumber}</td>
            <td class="px-4 py-2 border text-center">
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded remove-btn">
                    Remove
                </button>
            </td>
        `;
        registrationTable.appendChild(newRow);

        // Update data
        registeredSections.push(section);
        updateTotalCredits();

        button.disabled = true; // Disable "Add" button
        newRow.querySelector(".remove-btn").addEventListener("click", () => handleRemoveSection(section, newRow, button));
    }


    /**
     * Remove a section from the registration table.
     */
    async function handleRemoveSection(section, row, addButton) {
        const isLatest = await isLatestSemester(year, semester);
        registrationTable.removeChild(row);
        registeredSections = registeredSections.filter(s => s.sectionId !== section.sectionId);
        updateTotalCredits();

        addButton.disabled = false; // Enable "Add" button again
    }

    /**
     * Check for time and day conflicts with registered sections.
     */
    function checkConflict(newSection) {
        return registeredSections.some(registered =>
            registered.courseTitle === newSection.courseTitle ||
            (registered.day === newSection.day &&
            ((newSection.startTime >= registered.startTime && newSection.startTime < registered.endTime) ||
                (newSection.endTime > registered.startTime && newSection.endTime <= registered.endTime) ||
                (newSection.startTime <= registered.startTime && newSection.endTime >= registered.endTime)))
        );
    }

    /**
     * Update total credits in the registration table.
     */
    function updateTotalCredits() {
        const total = registeredSections.reduce((sum, section) => sum + parseInt(section.credits), 0);
        totalCreditsCell.textContent = total;
    }

    async function loadDefaultSections(semester, year, idStudent) {
        try {
            // Gửi yêu cầu đến API để lấy dữ liệu
            const response2 = await fetch(`/section_available/search/${semester}/${year}/${idStudent}`);

            if (!response2.ok) {
                throw new Error('Failed to fetch data');
            }

            const sections = await response2.json();
            console.log(sections);
            const registrationTable = document.getElementById("registrationTable");
            registrationTable.innerHTML = ""; // Xóa bảng hiện tại (nếu có)

            // Duyệt qua tất cả các phần học và thêm vào bảng
            sections.forEach(section => {
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                <td class="px-4 py-2 border">${section.sectionId}</td>
                <td class="px-4 py-2 border">${section.courseTitle}</td>
                <td class="px-4 py-2 border">${section.credits}</td>
                <td class="px-4 py-2 border">${section.teacherName}</td>
                <td class="px-4 py-2 border">${section.day}</td>
                <td class="px-4 py-2 border">${section.startTime}</td>
                <td class="px-4 py-2 border">${section.endTime}</td>
                <td class="px-4 py-2 border">${section.roomNumber}</td>
                <td class="px-4 py-2 border text-center">
                    <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded remove-btn" data-section='${JSON.stringify(section)}'>
                        Remove
                    </button>
                </td>
            `;
                registrationTable.appendChild(newRow);

                // Update data
                registeredSections.push(section);
                updateTotalCredits();

                newRow.querySelector(".remove-btn").addEventListener("click", () => handleRemoveSection(section, newRow, true));
            });

        } catch (error) {
            console.error('Error loading sections:', error);
        }
    }

    async function handleSemesterOrYearChange() {
        const semester = document.getElementById("semester").value;
        const year = document.getElementById("year").value;
        const idStudent = currentUserId;
        if (!semester || !year) {
            return;
        }

        loadDefaultSections(semester, year, idStudent);
    }

    async function deleteTakes(semester, year, idStudent) {
        try {
            const encodedSemester = encodeURIComponent(semester);
            console.log(`Sending DELETE request to /section_available/delete/${encodedSemester}/${year}/${idStudent}`);
            const response = await fetch(window.location.origin + `/section_available/delete/${encodedSemester}/${year}/${idStudent}`, {
                method: 'DELETE'
            });

            if (response.ok) {

                // them noi dung
            } else {
            }
        } catch (error) {
            console.error("Error during deletion:", error);
            alert("An error occurred while deleting the record.");
        }
    }

    async function addTakesFromRegistration(yearID, idStudent) {
        const table = document.getElementById("registrationTable");
        const rows = table.getElementsByTagName("tr");

        const registeredCourses = new Set();

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName("td");

            const sectionId = cells[0].innerText;
            if (registeredCourses.has(sectionId)) {
                continue;
            }

            const status = "Học lần đầu";
            const year = yearID;
            const grade = null;

            const takeData = {
                idTake: {
                    idStudent: idStudent,
                    idSection: sectionId
                },
                student: { id: idStudent },
                section: { idSection: sectionId },
                status: status,
                year: year,
                grade: grade,
            };

            registeredCourses.add(sectionId);


            try {
                const response = await fetch(window.location.origin + '/takes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(takeData)
                });

                if (response.ok) {
                } else {
                    const errorData = await response.json();
                    console.error(`Thêm khóa học thất bại: ${errorData.message}`);
                }
            } catch (error) {
                alert("Đã xảy ra lỗi khi thêm khóa học.");
            }
        }

    }

    document.getElementById("confirmRegistration").addEventListener("click", async () => {
        const semester = document.getElementById("semester").value;
        const year = document.getElementById("year").value;
        const idStudent = localStorage.getItem("currentUserId");

        if (!semester || !year || !idStudent) {
            alert("Please select semester, year, and provide student ID.");
            return;
        }

        const isLatest = await isLatestSemester(year, semester);
        if (!isLatest) {
            alert("Bạn không thể đăng ký học ở học kỳ này!");
            return;
        }

        deleteTakes(semester, year, idStudent);
        addTakesFromRegistration(year, idStudent);
        alert("Thành công!");
    });

    async function isLatestSemester(year, semester) {
        try {
            const response = await fetch(window.location.origin + '/sections/latest-semester');

            if (response.ok) {
                const latestSection = await response.json(); // Giả sử API trả về đối tượng Section

                if (Number(latestSection.year) === Number(year) &&
                    latestSection.semester.trim().toLowerCase() === semester.trim().toLowerCase()) {
                    return true;
                } else {
                    return false;
                }
            } else {
                console.error('Failed to fetch latest semester data');
                return false;
            }
        } catch (error) {
            console.error('Error occurred while checking latest semester:', error);
            return false;
        }
    }

    document.getElementById("semester").addEventListener("change", handleSemesterOrYearChange);
    document.getElementById("year").addEventListener("change", handleSemesterOrYearChange);


});
