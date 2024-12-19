document.addEventListener("DOMContentLoaded", function() {
    // Đặt studentId cần lấy dữ liệu
    const studentId = localStorage.getItem("currentUserId"); // Thay đổi studentId theo nhu cầu của bạn
    const apiUrl = window.location.origin + `/takes/grades/${studentId}`;

    // Hàm để gọi API và hiển thị kết quả
    function fetchGrades() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const gradesContent = document.getElementById("gradesContent");
                gradesContent.innerHTML = ""; // Xóa dữ liệu cũ

                if (data.length === 0) {
                    gradesContent.innerHTML = "<p class='text-center text-lg text-gray-600'>No grades available.</p>";
                    return;
                }

                // Nhóm dữ liệu theo năm và học kỳ
                const groupedData = groupByYearAndSemester(data);

                let allCourses = []; // Để tính tổng tín chỉ và GPA

                // Duyệt qua từng năm và học kỳ để tạo bảng
                for (const year in groupedData) {
                    const yearSection = document.createElement("div");
                    yearSection.classList.add("space-y-4");

                    // Tạo tiêu đề năm học
                    const yearHeader = document.createElement("h2");
                    yearHeader.classList.add("text-xl", "font-semibold", "mb-2");
                    yearHeader.textContent = `Year: ${year}`;
                    yearSection.appendChild(yearHeader);

                    // Duyệt qua các học kỳ trong năm
                    groupedData[year].forEach(semester => {
                        const semesterHeader = document.createElement("h3");
                        semesterHeader.classList.add("text-lg", "font-semibold", "mb-2");
                        semesterHeader.textContent = `${semester.semester}`;
                        yearSection.appendChild(semesterHeader);

                        // Tạo bảng cho học kỳ đó
                        const table = document.createElement("table");
                        table.classList.add("w-full", "table-auto", "border-collapse", "shadow-md", "rounded-lg");

                        // Tạo phần tiêu đề bảng
                        const tableHeader = document.createElement("thead");
                        const headerRow = document.createElement("tr");
                        headerRow.innerHTML = `
                            <th class="px-4 py-2 text-center border">Course ID</th>
                            <th class="px-4 py-2 text-center border">Title</th>
                            <th class="px-4 py-2 text-center border">Credits</th>
                            <th class="px-4 py-2 text-center border">Grade</th>
                            <th class="px-4 py-2 border text-center align-middle">Grade Letter</th>
                        `;
                        tableHeader.appendChild(headerRow);
                        table.appendChild(tableHeader);

                        // Tạo phần nội dung bảng
                        const tableBody = document.createElement("tbody");
                        semester.courses.forEach(course => {
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td class="px-4 py-2 text-center border">${course.idCourse}</td>
                                <td class="px-4 py-2 text-center border">${course.title}</td>
                                <td class="px-4 py-2 text-center border">${course.credits}</td>
                                <td class="px-4 py-2 text-center border">${course.grade}</td>
                                <td class="px-4 py-2 border text-center align-middle">${gradeToLetter(course.grade)}</td>
                            `;
                            tableBody.appendChild(row);

                            // Thêm các khóa học vào danh sách tất cả các khóa học để tính tổng số tín chỉ và GPA
                            allCourses.push(course);
                        });

                        table.appendChild(tableBody);
                        yearSection.appendChild(table);
                    });

                    gradesContent.appendChild(yearSection);
                }

                // Tính tổng tín chỉ và GPA
                const { totalCredits, gpa } = calculateTotalCreditsAndGPA(allCourses);

                const totalRow = document.createElement("div");
                totalRow.classList.add("mt-4");
                totalRow.innerHTML = `
                    <p><strong>Total Credits:</strong> ${totalCredits}</p>
                    <p><strong>GPA:</strong> ${gpa}</p>
                `;
                gradesContent.appendChild(totalRow);
            })
            .catch(error => {
                console.error("Error fetching grades:", error);
                const gradesContent = document.getElementById("gradesContent");
                gradesContent.innerHTML = "<p class='text-center text-lg text-red-600'>Failed to load grades. Please try again later.</p>";
            });
    }

    function groupByYearAndSemester(data) {
        return data.reduce((acc, grade) => {
            const { year, section_semester, idCourse, title, credits, grade: gradeValue } = grade;

            if (!acc[year]) {
                acc[year] = [];
            }

            const semesterIndex = acc[year].findIndex(semester => semester.semester === section_semester);
            if (semesterIndex === -1) {
                acc[year].push({
                    semester: section_semester,
                    courses: [
                        { idCourse, title, credits, grade: gradeValue }
                    ]
                });
            } else {
                acc[year][semesterIndex].courses.push({ idCourse, title, credits, grade: gradeValue });
            }

            return acc;
        }, {});
    }

    function calculateTotalCreditsAndGPA(courses) {
        let totalCredits = 0;
        let totalPoints = 0;

        courses.forEach(course => {
            const points = gradeToPoint(gradeToLetter(course.grade));
            totalCredits += course.credits;
            totalPoints += points * course.credits;
        });

        const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
        return { totalCredits, gpa };
    }

    function gradeToLetter(grade) {
        if (grade >= 9) return 'A+';
        if (grade >= 8.5) return 'A';
        if (grade >= 8) return 'B+';
        if (grade >= 7) return 'B';
        if (grade >= 6.5) return 'C+';
        if (grade >= 5.5) return 'C';
        if (grade >= 5) return 'D+'
        if (grade >= 4) return 'D';
        return 'F';
    }

    function gradeToPoint(grade) {
        if (grade === 'A+') return 4.0;
        if (grade === 'A') return 4.0;
        if (grade === 'B+') return 3.5;
        if (grade === 'B') return 3.0;
        if (grade === 'C+') return 2.5;
        if (grade === 'C') return 2.0;
        if (grade === 'D+') return 1.5;
        if (grade === 'D') return 1.0;
        return 0; // F
    }

    // Gọi hàm fetchGrades khi trang được tải
    fetchGrades();
});
