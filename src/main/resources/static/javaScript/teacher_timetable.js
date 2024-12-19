const searchNameBtn = document.getElementById("searchNameBtn");
const searchNameInput = document.getElementById("searchNameInput");
const teacherTimetable = document.getElementById("teacherTimetable");

async function fetchTimetable() {
    const teacherName = searchNameInput.value.trim();
    if (!teacherName) return alert("Please enter a teacher name.");
    try {
        const response = await fetch(window.location.origin + `/teacher_timetable/${teacherName}`);
        if (response.ok) {
            const timetable = await response.json();
            renderTimetable(timetable);
        } else {
            alert(`Teacher with Name "${teacherName}" not found.`);
        }
    } catch (error) {
        console.error("Error fetching timetable:", error);
    }
}

function renderTimetable(timetable) {
    teacherTimetable.innerHTML = "";

    // Check if timetable has data
    if (!timetable || timetable.length === 0) {
        teacherTimetable.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4">No timetable available.</td>
            </tr>
        `;
        return;
    }

    teacherTimetable.innerHTML = timetable.map(entry => `
        <tr>
            <td class="border-t py-2 px-4">${entry.teacherName}</td>
            <td class="border-t py-2 px-4">${entry.sectionId}</td>
            <td class="border-t py-2 px-4">${entry.courseTitle}</td>
            <td class="border-t py-2 px-4">${entry.day}</td>
            <td class="border-t py-2 px-4">${entry.startTime}</td>
            <td class="border-t py-2 px-4">${entry.endTime}</td>
            <td class="border-t py-2 px-4">${entry.roomNumber}</td>
        </tr>
    `).join("");
}

searchNameBtn.addEventListener("click", fetchTimetable);

searchNameInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchNameBtn.click();
    }
});