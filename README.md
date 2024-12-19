<h1>Website quản lý sinh viên</h1>
<p>Mô tả tính năng</p>
<h2>🚀 Languages and Tools I Use</h2>
<p><a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="42" height="42" /></a>
<a target="_blank" href="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" style="display: inline-block;"><img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="spring" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="42" height="42" /></a>
<a target="_blank" href="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" style="display: inline-block;"><img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="42" height="42" /></a></p>

### Mục lục 

[1. Giới thiệu](#giới-thiệu)  
[2. Tính năng](#tính-năng)  
[3. Công nghệ](#công-nghệ)  
[4. Cơ sở dữ liệu](#cơ-sở-dữ-liêu)  
[5. Cách cài đặt](#cài-đặt)  
[6. Thành viên nhóm](#thành-viên-nhóm)

## Giới thiệu

Web App làm nhiệm vụ quản lý các sinh viên thuộc phạm vi quản lý của cố vấn học tập.

![image](https://github.com/user-attachments/assets/ec10f18a-446f-4f61-8f0e-73913175981b)


## Tính năng
### Tổng quan
- **Giao diện** trực quan, có đầy đủ các chức năng thông dụng
- **Backend và hệ thống quản lý phiên đăng nhập** 
### Tài khoản
- **Tài khoản là public**, vì là website quản lý sinh viên nên hệ thông tài khoản sẽ được cấp trước
cho quản lý để đăng nhập.
- **Profile cá nhân**, đổi mật khẩu và khôi phục mật khẩu bằng email (tính năng này đang hoàn thiện)
### Mô tả chung về tính năng
- **Trang Student**
  - CVHT có thể quản lý tất cả sinh viên
  - CVHT có thể thêm, sửa, xoá inh viên
  - Tìm kiếm sinh viên theo id, name, industry, idCourse
  - Thêm sinh viên kết hợp với thêm các khoá học của sinh viên
  - Hỗ trợ xem lịch của từng sinh viên
- **Trang Teacher**
  - Đầy đủ các chức năng cơ bản như thêm, sửa và xoá teacher
  - Hỗ trợ xem thời gian biểu của teacher
  - Có bộ lọc tìm kiếm teacher
- **Trang Faculties**, là trang cung cấp thông tin của khoa
  - Đầy đủ các chức năng cơ bản như thêm, sửa và xoá faculty
  - Có bộ lọc tìm kiếm faculty
- **Trang industry**, là trang cung cấp thông tin của ngành
  - Đầy đủ các chức năng cơ bản như thêm, sửa và xoá faculty
  - Có bộ lọc tìm kiếm faculty
- **Trang Courses**, là trang lưu trư thông tin khoa hoc
  - Đầy đủ các chức năng cơ bản như thêm, sửa và xoá course
  - Có bộ lọc tìm kiếm course
  - Thêm, sửa, xoá course thuận tiện hơn với gợi ý từ cơ sở dữ liệu
- **Trang Takes**, là trang quản lý tác vụ sinh viên
  - Đầy đủ các chức năng cơ bản như thêm, sửa và xoá takes
  - Có bộ lọc tìm kiếm take
  - Thêm, sửa, xoá takes thuận tiện hơn với gợi ý từ cơ sở dữ liệu
- **Trang Time**, là trang quản thời gian khoá học
  - Đầy đủ các chức năng cơ bản như thêm, sửa và xoá time
  - Có bộ lọc tìm kiếm time
  - Thêm, sửa, xoá takes thuận tiện hơn với gợi ý từ cơ sở dữ liệu
### Nhóm tính năng xem thời khoá biểu
- **Thời khoá biểu sinh viên, giảng viên**
  - Gồm toàn bộ thông tin các buổi học, dạy của sinh viên, giảng viên
  ![image](https://github.com/user-attachments/assets/bbb964a5-b401-4058-99e3-8d8ff4c0e6be)


## Công nghệ

**Kiến trúc:** Client - Server Web Application, Rest API Approach

**Front-end:** React.js, Recoil, Ant Design, Rechart (visualize dữ liệu)

**Back-end:** Node.js, MongoDB (database)

**Giao thức sử dụng:** HTTP Request + Axios, WebSocket

**Ngôn ngữ**: JavaScript, HTML, CSS

## Cơ sở dữ liệu

| Table   | Mục đích                                                        |
|---------|-----------------------------------------------------------------|
| student | Lưu trữ danh sách sinh viên                                      |
| industry| Một trường thông tin liên quan đến sinh viên                    |
| faculty | Một trường thông tin liên quan đến sinh viên                    |
| teacher | Lưu trữ danh sách giảng viên                                    |
| take    | Thao tác liên quan đến sinh viên (học phần, điểm số)            |
| time    | Thời gian, địa điểm cho một course                              |
| course  | Lưu trữ thông tin các khoá học                                  |




![image](https://github.com/user-attachments/assets/0a284c74-e28f-4063-abad-d8decc2d8980)


## Cài đặt

### 1. Cài đặt môi trường

**Môi trường runcode:** Intellij
- clone code về và mở bằng Intellij
**Môi trường liên kết cơ sở dự liệu:** MySQL WorkBench hoặc Xampp
- chạy file .sql trong MySQL WorkBench để tải về cơ sở dữ liệu mẫu

### 2. Kiểm thử

- Chạy file StudentManagementApplicatiton và truy cập cổng đường link http://localhost:8080
- Đăng nhập bằng tài khoản và mật khẩu mặc định là:
- **tài khoản:** admin
- **mật khẩu:** admin


## Thành viên nhóm



