-- Drop and recreate the schema
DROP SCHEMA IF EXISTS `student_management`;
CREATE SCHEMA `student_management`;

-- Create tables
CREATE TABLE student_management.faculty (
    id_faculty VARCHAR(15) NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    number_teacher INT,
    number_student INT
);

CREATE TABLE student_management.industry (
    id_industry VARCHAR(15) NOT NULL PRIMARY KEY,
    id_faculty VARCHAR(15) NOT NULL,
    year_number DOUBLE NOT NULL,
    title VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_faculty) REFERENCES student_management.faculty(id_faculty)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE student_management.teacher (
    id_teacher INT NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    birthday DATE
);

CREATE TABLE student_management.courses (
    id_course VARCHAR(15) NOT NULL PRIMARY KEY,
    id_teacher INT NOT NULL,
    credits INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_teacher) REFERENCES student_management.teacher(id_teacher)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE student_management.student (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    birthday DATE,
    credits INT NOT NULL DEFAULT 0,
    id_class VARCHAR(50),
    id_industry VARCHAR(15),
    FOREIGN KEY (id_industry) REFERENCES student_management.industry(id_industry)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE student_management.time (
	id_time INT NOT NULL PRIMARY KEY auto_increment,
    id_course VARCHAR(15) NOT NULL,
    day VARCHAR(10) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(50),
    FOREIGN KEY (id_course) REFERENCES student_management.courses(id_course)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE student_management.takes (
	id_takes INT PRIMARY KEY auto_increment,
    id INT NOT NULL,
    id_course VARCHAR(15) NOT NULL,
    status VARCHAR(15) NOT NULL,
    year INT,
    grade DOUBLE,
    FOREIGN KEY (id) REFERENCES student_management.student(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (id_course) REFERENCES student_management.courses(id_course)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

INSERT INTO student_management.faculty (id_faculty, title, number_teacher, number_student)
VALUES
('I', 'Công nghệ thông tin', 100, 3000),
('E', 'Điện tử viễn thông', 70, 2000),
('P', 'Vật lý kỹ thuật và Công nghệ Nano', 70, 200),
('M', 'Cơ học kỹ thuật và tự động hoá', 100, 2000),
('G', 'Công nghệ nông nghiệp', 100, 1500),
('C', 'Công nghệ xây dựng- giao thông', 150, 4000),
('S', 'Viện công nghệ hàng không vũ trụ', 100, 1200),
('A', 'Viện trí tuệ nhân tạo', 50, 100);

insert into student_management.industry (id_industry, id_faculty, year_number, title) 
values
('I-IT', 'I', 4, 'Công nghệ thông tin'),
('I-CS', 'I',4 , 'Khoa học máy tính'),
('I-IS', 'I', 4, 'Hệ thống thông tin'),
('I-CN', 'I', 4, 'Mạng máy tính và truyền thông dữ liệu'),
('E-EC', 'E', 4, 'Công nghệ kỹ thuật điện tử - viễn thông'),
('E-CE', 'E', 4, 'Kỹ thuật máy tính'),
('E-RE', 'E', 4, 'Kỹ thuật robot'),
('M-MT', 'M', 4, 'Công nghệ kỹ thuật cơ điện tử'),
('M-EM', 'M', 4, 'Cơ kỹ thuật'),
('M-AT', 'M', 4, 'Kỹ thuật điều khiển và tự động hoá'),
('P-EP', 'P', 4, 'Vật lý kỹ thuật'),
('P-EE', 'P', 4, 'Kỹ thuật năng lượng'),
('C-CE', 'C', 4, 'Công nghệ kỹ thuật xây dựng'),
('C-ID', 'C', 4, 'Thiết kế công nghiệp đồ hoạ'),
('S-AE', 'S', 4, 'Công nghệ hàng không vũ trụ'),
('G-AI', 'G', 4, 'Trí tuệ nhân tạo');

INSERT INTO student_management.teacher (id_teacher, email, name, birthday) VALUES
(1, 'teacherA@gmail.com', 'Teacher A', NULL),
(2, 'teacherB@gmail.com', 'Teacher B', NULL),
(3, 'teacherC@gmail.com', 'Teacher C', NULL),
(4, 'teacherD@gmail.com', 'Teacher D', NULL),
(5, 'teacherE@gmail.com', 'Teacher E', NULL),
(6, 'teacherF@gmail.com', 'Teacher F', NULL),
(7, 'teacherG@gmail.com', 'Teacher G', NULL),
(8, 'teacherH@gmail.com', 'Teacher H', NULL),
(9, 'teacherI@gmail.com', 'Teacher I', NULL),
(10, 'teacherJ@gmail.com', 'Teacher J', NULL),
(11, 'teacherK@gmail.com', 'Teacher K', NULL),
(12, 'teacherL@gmail.com', 'Teacher L', NULL),
(13, 'teacherM@gmail.com', 'Teacher M', NULL),
(14, 'teacherN@gmail.com', 'Teacher N', NULL),
(15, 'teacherO@gmail.com', 'Teacher O', NULL);

insert into student_management.student(id, name, birthday, credits, id_class, id_industry)
values
(23021001, 'Student A', NULL, 50, 'CS1', 'I-CS'),
(23021002, 'Student B', NULL, 50, 'CS1', 'I-CS'),
(23021003, 'Student C', NULL, 50, 'CS1', 'I-CS'),
(23021004, 'Student D', NULL, 50, 'CS1', 'I-CS'),
(23021005, 'Student E', NULL, 50, 'CS2', 'I-CS'),
(23021006, 'Student F', NULL, 50, 'CS2', 'I-CS'),
(23021007, 'Student G', NULL, 50, 'CS2', 'I-CS'),
(23021008, 'Student H', NULL, 50, 'CS2', 'I-CS'),
(23021009, 'Student I', NULL, 50, 'IT1', 'I-IT'),
(23021010, 'Student J', NULL, 50, 'IT1', 'I-IT'),
(23021011, 'Student K', NULL, 50, 'IT1', 'I-IT'),
(23021012, 'Student L', NULL, 50, 'IT1', 'I-IT'),
(23021013, 'Student M', NULL, 50, 'IT2', 'I-IT'),
(23021014, 'Student N', NULL, 50, 'IT2', 'I-IT'),
(23021015, 'Student O', NULL, 50, 'IT2', 'I-IT'),
(23021016, 'Student P', NULL, 50, 'IT2', 'I-IT'),
(23021017, 'Student Q', NULL, 50, 'CE1', 'E-CE'),
(23021018, 'Student R', NULL, 50, 'CE1', 'E-CE'),
(23021019, 'Student S', NULL, 50, 'CE1', 'E-CE'),
(23021020, 'Student T', NULL, 50, 'CE1', 'E-CE'),
(23021021, 'Student U', NULL, 50, 'CE2', 'E-CE'),
(23021022, 'Student V', NULL, 50, 'CE2', 'E-CE'),
(23021023, 'Student W', NULL, 50, 'CE2', 'E-CE'),
(23021024, 'Student X', NULL, 50, 'CE2', 'E-CE'),
(23021025, 'Student Y', NULL, 50, 'AT1', 'M-AT'),
(23021026, 'Student Z', NULL, 50, 'AT1', 'M-AT'),
(23021027, 'Student AA', NULL, 50, 'AT1', 'M-AT'),
(23021028, 'Student AB', NULL, 50, 'AT1', 'M-AT'),
(23021029, 'Student AC', NULL, 50, 'AT2', 'M-AT'),
(23021030, 'Student AD', NULL, 50, 'AT2', 'M-AT'),
(23021031, 'Student AE', NULL, 50, 'AT2', 'M-AT'),
(23021032, 'Student AF', NULL, 50, 'AT2', 'M-AT'),
(23021033, 'Student AG', NULL, 50, 'EP', 'P-EP'),
(23021034, 'Student AH', NULL, 50, 'EP', 'P-EP'),
(23021035, 'Student AI', NULL, 50, 'EP', 'P-EP'),
(23021036, 'Student AJ', NULL, 50, 'EP', 'P-EP'),
(23021037, 'Student AK', NULL, 50, 'EE', 'P-EE'),
(23021038, 'Student AL', NULL, 50, 'EE', 'P-EE'),
(23021039, 'Student AM', NULL, 50, 'EE', 'P-EE'),
(23021040, 'Student AN', NULL, 50, 'EE', 'P-EE'),
(23021041, 'Student AO', NULL, 50, 'CE', 'C-CE'),
(23021042, 'Student AP', NULL, 50, 'CE', 'C-CE'),
(23021043, 'Student AQ', NULL, 50, 'CE', 'C-CE'),
(23021044, 'Student AR', NULL, 50, 'CE', 'C-CE'),
(23021045, 'Student AS', NULL, 50, 'CE', 'C-CE'),
(23021046, 'Student AT', NULL, 50, 'AI', 'G-AI'),
(23021047, 'Student AU', NULL, 50, 'AI', 'G-AI'),
(23021048, 'Student AV', NULL, 50, 'AI', 'G-AI'),
(23021049, 'Student AW', NULL, 50, 'AI', 'G-AI'),
(23021050, 'Student AX', NULL, 50, 'AI', 'G-AI');

Insert into student_management.courses (id_course, id_teacher, credits, title)
values
('MAT1093', 1, 4, 'Đại số'),
('MAT1041', 2, 4, 'Giải tích 1'),
('MAT1042', 2, 4, 'Giải tích 2'),
('EPN1095', 3, 2, 'Vật lý đại cương 1'),
('EPN1096', 3, 2, 'Vật lý đại cương 2'),
('INT1008', 4, 3, 'Nhập môn lập trình'),
('ELT2035', 5, 3, 'Tín hiệu hệ thống'),
('INT2210', 6, 4, 'Cấu trúc dữ liệu và giải thuật'),
('MAT1101', 7, 3, 'Xác suất thống kê'),
('INT2215', 8, 4, 'Lập trình nâng cao'),
('INT2211', 9, 4, 'Cơ sở dữ liệu'),
('INT2212', 10, 4, 'Kiến trúc máy tính'),
('INT1050', 11, 4, 'Toán rời rạc'),
('INT2214', 12, 4, 'Nguyên lý hệ điều hành'),
('INT2213', 13, 4, 'Mạng máy tính'),
('INT2204', 14, 4, 'Lập trình hướng đối tượng'),
('INT2208', 15, 3, 'Công nghệ phần mềm');

insert into student_management.time(id_time, id_course, day, start_time, end_time, room_number)
values
(1, 'MAT1093', 'Thứ 2', '10:00:00','12:00:00', '101-G2'),
(2, 'MAT1093', 'Thứ 5', '09:00:00','11:00:00', '101-G2'),
(3, 'MAT1041', 'Thứ 2', '13:00:00','17:00:00', '101-G2'),
(4, 'MAT1041', 'Thứ 6', '08:00:00','10:00:00', '101-G2'),
(5, 'EPN1095', 'Thứ 7', '09:00:00','11:00:00', '101-G2'),
(6, 'INT1008', 'Thứ 3', '09:00:00','12:00:00', '101-G2'),
(7, 'ELT2035', 'Thứ 4', '13:00:00','16:00:00', '101-G2'),
(8, 'INT2210', 'Thứ 3', '13:00:00','15:00:00', '101-G2'),
(9, 'INT2210', 'Thứ 6', '15:00:00','17:00:00', '101-G2'),
(10, 'MAT1101', 'Thứ 2', '07:00:00','10:00:00', '101-G2'),
(11, 'INT2211', 'Thứ 3', '10:00:00','12:00:00', '205-GĐ3'),
(12, 'INT2212', 'Thứ 4', '13:00:00','17:00:00', '205-GĐ3'),
(13, 'INT1050', 'Thứ 6', '08:00:00','12:00:00', '205-GĐ3'),
(14, 'INT2204', 'Thứ 5', '13:00:00','15:00:00', '205-GĐ3'),
(15, 'INT2204', 'Thứ 7', '09:00:00','11:00:00', '205-GĐ3'),
(16, 'INT2214', 'Thứ 3', '13:00:00','17:00:00', '205-GĐ3');

insert into student_management.takes (id_takes, id, id_course, status, year, grade)
values
(1, 23021001, 'MAT1093', 'Học lần đầu', 2024, NULL),
(2, 23021002, 'MAT1093', 'Học lần đầu', 2024, NULL),
(3, 23021003, 'MAT1093', 'Học lần đầu', 2024, NULL),
(4, 23021004, 'MAT1093', 'Học lần đầu', 2024, NULL),
(5, 23021005, 'MAT1093', 'Học lần đầu', 2024, NULL),
(6, 23021006, 'MAT1093', 'Học lần đầu', 2024, NULL),
(7, 23021007, 'MAT1093', 'Học lần đầu', 2024, NULL),
(8, 23021008, 'MAT1093', 'Học lần đầu', 2024, NULL),
(9, 23021009, 'MAT1093', 'Học lần đầu', 2024, NULL),
(10, 23021010, 'MAT1093', 'Học lần đầu', 2024, NULL),
(11, 23021011, 'MAT1041', 'Học lần đầu', 2024, NULL),
(12, 23021012, 'MAT1041', 'Học lần đầu', 2024, NULL),
(13, 23021013, 'MAT1041', 'Học lần đầu', 2024, NULL),
(14, 23021014, 'MAT1041', 'Học lần đầu', 2024, NULL),
(15, 23021015, 'MAT1041', 'Học lần đầu', 2024, NULL),
(16, 23021016, 'MAT1041', 'Học lần đầu', 2024, NULL),
(17, 23021017, 'MAT1041', 'Học lần đầu', 2024, NULL),
(18, 23021018, 'MAT1041', 'Học lần đầu', 2024, NULL),
(19, 23021019, 'MAT1041', 'Học lần đầu', 2024, NULL),
(20, 23021020, 'MAT1041', 'Học lần đầu', 2024, NULL),
(21, 23021021, 'EPN1095', 'Học lần đầu', 2024, NULL),
(22, 23021022, 'EPN1095', 'Học lần đầu', 2024, NULL),
(23, 23021023, 'EPN1095', 'Học lần đầu', 2024, NULL),
(24, 23021024, 'EPN1095', 'Học lần đầu', 2024, NULL),
(25, 23021025, 'EPN1095', 'Học lần đầu', 2024, NULL),
(26, 23021026, 'INT1008', 'Học lần đầu', 2024, NULL),
(27, 23021027, 'INT1008', 'Học lần đầu', 2024, NULL),
(28, 23021028, 'INT1008', 'Học lần đầu', 2024, NULL),
(29, 23021029, 'INT1008', 'Học lần đầu', 2024, NULL),
(30, 23021030, 'INT1008', 'Học lần đầu', 2024, NULL),
(31, 23021031, 'INT2210', 'Học lần đầu', 2024, NULL),
(32, 23021032, 'INT2210', 'Học lần đầu', 2024, NULL),
(33, 23021033, 'INT2210', 'Học lần đầu', 2024, NULL),
(34, 23021034, 'INT2210', 'Học lần đầu', 2024, NULL),
(35, 23021035, 'INT2210', 'Học lần đầu', 2024, NULL),
(36, 23021036, 'INT2210', 'Học lần đầu', 2024, NULL),
(37, 23021037, 'INT2210', 'Học lần đầu', 2024, NULL),
(38, 23021038, 'INT2210', 'Học lần đầu', 2024, NULL),
(39, 23021039, 'INT2210', 'Học lần đầu', 2024, NULL),
(40, 23021040, 'INT2210', 'Học lần đầu', 2024, NULL),
(41, 23021041, 'MAT1101', 'Học lần đầu', 2024, NULL),
(42, 23021042, 'MAT1101', 'Học lần đầu', 2024, NULL),
(43, 23021043, 'MAT1101', 'Học lần đầu', 2024, NULL),
(44, 23021044, 'MAT1101', 'Học lần đầu', 2024, NULL),
(45, 23021045, 'MAT1101', 'Học lần đầu', 2024, NULL),
(46, 23021046, 'INT2211', 'Học lần đầu', 2024, NULL),
(47, 23021047, 'INT2211', 'Học lần đầu', 2024, NULL),
(48, 23021048, 'INT2211', 'Học lần đầu', 2024, NULL),
(49, 23021049, 'INT2211', 'Học lần đầu', 2024, NULL),
(50, 23021050, 'INT2211', 'Học lần đầu', 2024, NULL),
(51, 23021001, 'INT2214', 'Học lần đầu', 2024, NULL),
(52, 23021002, 'INT2214', 'Học lần đầu', 2024, NULL),
(53, 23021003, 'INT2214', 'Học lần đầu', 2024, NULL),
(54, 23021004, 'INT2214', 'Học lần đầu', 2024, NULL),
(55, 23021005, 'INT2214', 'Học lần đầu', 2024, NULL),
(56, 23021006, 'INT2204', 'Học cải thiện', 2024, NULL),
(57, 23021007, 'INT2204', 'Học cải thiện', 2024, NULL),
(58, 23021008, 'INT2204', 'Học cải thiện', 2024, NULL),
(59, 23021009, 'INT2204', 'Học cải thiện', 2024, NULL),
(60, 23021010, 'INT2204', 'Học cải thiện', 2024, NULL),
(61, 23021011, 'INT2212', 'Học cải thiện', 2024, NULL),
(62, 23021012, 'INT2212', 'Học cải thiện', 2024, NULL),
(63, 23021013, 'INT2212', 'Học cải thiện', 2024, NULL),
(64, 23021014, 'INT2212', 'Học cải thiện', 2024, NULL),
(65, 23021015, 'INT2212', 'Học cải thiện', 2024, NULL),
(66, 23021016, 'INT2212', 'Học cải thiện', 2024, NULL),
(67, 23021017, 'INT2212', 'Học cải thiện', 2024, NULL),
(68, 23021018, 'INT2212', 'Học cải thiện', 2024, NULL),
(69, 23021019, 'INT2212', 'Học cải thiện', 2024, NULL),
(70, 23021020, 'INT2212', 'Học cải thiện', 2024, NULL);