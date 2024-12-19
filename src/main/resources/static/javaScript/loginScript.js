// Lấy phần tử HTML chứa input password
const password = document.getElementById("password");

// Lấy phần tử toggle (biểu tượng hiển thị/ẩn password)
const toggle = document.getElementById("toggle");

// Hàm hiển thị hoặc ẩn mật khẩu
function showPassword() {
    // Nếu input đang ở chế độ 'password', chuyển sang 'text'
    if (password.type === 'password') {
        password.setAttribute('type', 'text');
        toggle.classList.add("hide");
    } else {
        // Ngược lại, chuyển về chế độ 'password'
        password.setAttribute('type', 'password');
        toggle.classList.remove("hide");
    }
}

// Hàm xử lý logic đăng nhập
async function handleLogin(event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let role = "";

    const roleSelection = document.querySelector('input[name="role"]:checked');
    if (roleSelection) {
        role = roleSelection.value;
    }

    if (username && password && role) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ username, password, role }),
            });

            if (response.ok) {
                const result = await response.text();

                if (role === "manager") {
                    // Redirect manager to students page
                    window.location.href = '/students.html';
                } else if (role === "student") {
                    localStorage.setItem("currentUserId", result);
                    window.location.href = '/Users.html';
                }
            } else {
                const errorMessage = await response.text();
                alert(`Login failed: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    } else {
        alert("Please fill in all fields and select a role.");
    }
}

// To retrieve the current user's ID in other scripts
const currentUserId = localStorage.getItem("currentUserId");
