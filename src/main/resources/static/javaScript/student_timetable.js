const searchIdBtn = document.getElementById("searchIdBtn");
const searchIdInput = document.getElementById("searchIdInput");
const studentTimetable = document.getElementById("studentTimetable");

async function fetchTimetable() {
    const studentId = searchIdInput.value.trim();
    if (!studentId) return alert("Please enter a student ID.");
    try {
        const response = await fetch(window.location.origin + `/student_timetable/${studentId}`);
        if (response.ok) {
            const timetable = await response.json();
            renderTimetable(timetable);
        } else {
            alert(`Student with ID "${studentId}" not found.`);
        }
    } catch (error) {
        console.error("Error fetching timetable:", error);
    }
}

function renderTimetable(timetable) {
    studentTimetable.innerHTML = "";

    // Check if timetable has data
    if (!timetable || timetable.length === 0) {
        studentTimetable.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4">No timetable available.</td>
            </tr>
        `;
        return;
    }

    studentTimetable.innerHTML = timetable.map(entry => `
        <tr>
            <td class="border-t py-2 px-4">${entry.studentId}</td>
            <td class="border-t py-2 px-4">${entry.studentName}</td>
            <td class="border-t py-2 px-4">${entry.sectionId}</td>
            <td class="border-t py-2 px-4">${entry.courseTitle}</td>
            <td class="border-t py-2 px-4">${entry.day}</td>
            <td class="border-t py-2 px-4">${entry.startTime}</td>
            <td class="border-t py-2 px-4">${entry.endTime}</td>
            <td class="border-t py-2 px-4">${entry.roomNumber}</td>
        </tr>
    `).join("");
}

searchIdBtn.addEventListener("click", fetchTimetable);

searchIdInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchIdBtn.click();
    }
});