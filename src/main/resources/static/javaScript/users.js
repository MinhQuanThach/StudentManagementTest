const CourseService = {
    async fetchCourses(studentID) {
        try {
            const response = await fetch(window.location.origin + `/takes/student-sections?studentID=${studentID}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch courses from service:", error);
            return [];
        }
    }
};

const CourseController = {
    async loadCourses() {
        try {

            const username = localStorage.getItem("currentUserId");
            const sections = await CourseService.fetchCourses(username);

            if (sections.length === 0) {
                alert("No courses found for the student.");
            } else {
                CourseView.renderSections(sections);
            }
        } catch (error) {
            console.error("Error loading courses:", error);
        }
    }
};

const CourseView = {
    renderSections(sections) {
        const sectionsContainer = document.querySelector('.grid');

        const imageArr = [
            "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-anh-thien-nhien-dep-3d-001.jpg",
            "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-dep-thien-nhien-thump.jpg",
            "https://img.pikbest.com/origin/09/41/85/916pIkbEsTzRC.jpg!w700wp",
            "https://png.pngtree.com/thumb_back/fw800/background/20240103/pngtree-contemporary-abstract-pattern-hand-drawn-painting-recreating-abstract-shapes-and-textures-image_13877643.png",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaeHAG6BKD72eUtLzF_WSRkjWC60-Ge4JK9A&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCN-rro3vnbVtsBCjtz7-XS7a1B5_4n7Nr-A&s"
        ];

        sectionsContainer.innerHTML = '';

        if (sections.length === 0) {
            sectionsContainer.innerHTML = '<p>No sections available.</p>';
            return;
        }

        sections.forEach(section => {
            const sectionCard = document.createElement('div');
            sectionCard.className = 'bg-white shadow-lg rounded-lg overflow-hidden';

            const randomImage = imageArr[Math.floor(Math.random() * imageArr.length)];
            sectionCard.innerHTML = `
        <img src="${randomImage}" 
        alt="Course Image" class="w-full h-40 object-cover">
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-800">${section.title}</h2>
          <p class="text-gray-600 mt-2">Course ID: ${section.id_section}</p>
          <p class="text-gray-600">Status: ${section.status}</p>
          <p class="text-gray-600">Semester: ${section.semester} ${section.year}</p>
        </div>
      `;

            sectionsContainer.appendChild(sectionCard);
        });
    }
};

//const username = 23020001;
window.addEventListener('DOMContentLoaded', () => CourseController.loadCourses());
