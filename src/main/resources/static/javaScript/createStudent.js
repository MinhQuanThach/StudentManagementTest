async function loadIndustries() {
    try {
        const response = await fetch(window.location.origin + '/industries', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch industries: ${response.status}`);
        }

        const industries = await response.json();
        const industrySelect = document.getElementById('industry');

        // Xóa tất cả các option trừ option mặc định
        industrySelect.innerHTML = '<option value="">Select an industry</option>';

        // Thêm các option từ API
        industries.forEach(({ idIndustry, title }) => {
            const option = new Option(`${title} (${idIndustry})`, idIndustry);
            industrySelect.add(option);
        });
    } catch (error) {
        console.error('Error loading industries:', error);
        alert('Failed to load industries. Please try again later.');
    }
}

// Gọi hàm khi trang tải xong
document.addEventListener('DOMContentLoaded', loadIndustries);

async function createStudent() {
    const adminId = document.getElementById('Administrator_ID').value.trim();
    const fullName = document.getElementById('name').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const dob = document.getElementById('dob').value.trim();
    const credits = parseInt(document.getElementById('mobile').value, 10);
    const idClass = document.getElementById('idClass').value.trim();
    const industry = document.getElementById('industry').value.trim();

    // Lấy danh sách các khóa học
    const courseItems = document.querySelectorAll('.course-item');
    const courses = Array.from(courseItems).map(item => ({
        idCourse: item.querySelector('input[name="idCourse"]').value.trim(),
        title: item.querySelector('input[name="title"]').value.trim(),
        credits: parseInt(item.querySelector('input[name="credits"]').value, 10),
        idTeacher: item.querySelector('input[name="idTeacher"]').value.trim(),
    }));

    const takes = courses.map(({ idCourse }) => ({
        idTake: null,
        course: idCourse,
        student: adminId,
        status: document.querySelector('select[name="status"]').value,
        year: 2023,
        grade: 0.0,
    }));

    // if (!adminId || !fullName || !dob || isNaN(credits) || !idClass || !industry) {
    //     alert('Please fill out all required fields!');
    //     return;
    // }

    try {
        // Thêm sinh viên
        const studentResponse = await fetch(window.location.origin + '/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: adminId,
                name: fullName,
                password: adminId,
                birthday: dob,
                credits,
                idClass,
                industry: { idIndustry: industry },
            }),
        });

        if (!studentResponse.ok) {
            const errorData = await studentResponse.json();
            alert(`Failed to add student: ${errorData.message || 'Unknown error.'}`);
            return;
        }

        // Thêm khóa học
        for (const course of courses) {
            const courseResponse = await fetch(window.location.origin + '/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idCourse: course.idCourse,
                    teacher: {
                        idTeacher: course.idTeacher
                    },
                    credits: course.credits,
                    title: course.title,
                }),
            });

            if (!courseResponse.ok) {
                console.error(`Failed to add course:`, await courseResponse.text());
            }
        }

        // Thêm `takes`
        let maxIdTake = await getMaxIdTake();
        for (const take of takes) {
            take.idTake = maxIdTake++;  // Gán id mới cho mỗi take


            const takeResponse = await fetch(window.location.origin + '/takes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idTake: take.idTake,
                    student: { id: take.student },
                    course: { idCourse: take.course},
                    status: take.status,
                    year: 2024,
                    grade: 0,
                }),
            });

            if (!takeResponse.ok) {
                console.error(`Failed to add take:`, await takeResponse.text());
            } else {
                console.log(`Take added successfully:`, await takeResponse.json());
            }
        }

        alert('Student added successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add student. Please try again later.');
    }
}

async function getMaxIdTake() {
    try {
        const response = await fetch(window.location.origin + '/takes');
        if (!response.ok) throw new Error('Failed to fetch takes');

        const takes = await response.json();
        return takes.length > 0 ? Math.max(...takes.map(take => take.idTake)) + 1 : 1;
    } catch (error) {
        console.error('Error fetching max idTake:', error);
        return 1;
    }
}

function addCourseItem() {
    const container = document.getElementById('course-list-container');
    if (container.querySelectorAll('.course-item').length >= 10) {
        alert('Maximum of 10 courses can be added');
        return;
    }

    const newCourseItem = container.querySelector('.course-item').cloneNode(true);
    newCourseItem.querySelectorAll('input').forEach(input => (input.value = ''));
    container.appendChild(newCourseItem);

    // Thêm sự kiện xóa
    newCourseItem.querySelector('.remove-course-item').addEventListener('click', () => {
        newCourseItem.remove();
    });
}

document.getElementById('add-course-item').addEventListener('click', addCourseItem);
document.querySelectorAll('.remove-course-item').forEach(button => {
    button.addEventListener('click', () => button.closest('.course-item').remove());
});
