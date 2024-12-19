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

CREATE TABLE student_management.courses (
    id_course VARCHAR(15) NOT NULL PRIMARY KEY,
    credits INT NOT NULL,
    title VARCHAR(100) NOT NULL
);

create table student_management.section (
id_section varchar(15) primary key,
id_course varchar(15) not null,
semester varchar(25) not null,
year INT not null,
foreign key (id_course) references student_management.courses(id_course)
on delete cascade
on update cascade
);

CREATE TABLE student_management.time (
	id_time INT NOT NULL PRIMARY KEY auto_increment,
    id_section varchar(15) not null,
    day VARCHAR(10) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(50),
    FOREIGN KEY (id_section) REFERENCES student_management.section(id_section)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE student_management.teacher (
    id_teacher INT NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    birthday DATE
);

CREATE TABLE student_management.teaches (
    id_teacher INT NOT NULL,
    id_section VARCHAR(15) NOT NULL,
    PRIMARY KEY (id_teacher, id_section),
    FOREIGN KEY (id_teacher) REFERENCES student_management.teacher(id_teacher)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (id_section) REFERENCES student_management.section(id_section)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);



CREATE TABLE student_management.student (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    birthday DATE,
    credits INT NOT NULL DEFAULT 0,
    id_class VARCHAR(50),
    id_industry VARCHAR(15),
    FOREIGN KEY (id_industry) REFERENCES student_management.industry(id_industry)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE student_management.takes (
	id INT not null,
    id_section varchar(15) NOT NULL,
    status VARCHAR(15) NOT NULL,
    year INT,
    grade DOUBLE,
    primary key (id, id_section),
    FOREIGN KEY (id) REFERENCES student_management.student(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (id_section) REFERENCES student_management.section(id_section)
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
(15, 'teacherO@gmail.com', 'Teacher O', NULL),
(16, 'teacherP@gmail.com', 'Teacher P', NULL),
(17, 'teacherQ@gmail.com', 'Teacher Q', NULL),
(18, 'teacherR@gmail.com', 'Teacher R', NULL),
(19, 'teacherS@gmail.com', 'Teacher S', NULL),
(20, 'teacherT@gmail.com', 'Teacher T', NULL);

insert into student_management.student(id, name, password, birthday, credits, id_class, id_industry)
values
(23021001, 'Student A', '23021001', NULL, 50, 'CS1', 'I-CS'),
(23021002, 'Student B', '23021002', NULL, 50, 'CS1', 'I-CS'),
(23021003, 'Student C', '23021003', NULL, 50, 'CS1', 'I-CS'),
(23021004, 'Student D', '23021004', NULL, 50, 'CS1', 'I-CS'),
(23021005, 'Student E', '23021005', NULL, 50, 'CS2', 'I-CS'),
(23021006, 'Student F', '23021006', NULL, 50, 'CS2', 'I-CS'),
(23021007, 'Student G', '23021007', NULL, 50, 'CS2', 'I-CS'),
(23021008, 'Student H', '23021008', NULL, 50, 'CS2', 'I-CS'),
(23021009, 'Student I', '23021009', NULL, 50, 'IT1', 'I-IT'),
(23021010, 'Student J', '23021010', NULL, 50, 'IT1', 'I-IT'),
(23021011, 'Student K', '23021011', NULL, 50, 'IT1', 'I-IT'),
(23021012, 'Student L', '23021012', NULL, 50, 'IT1', 'I-IT'),
(23021013, 'Student M', '23021013', NULL, 50, 'IT2', 'I-IT'),
(23021014, 'Student N', '23021014', NULL, 50, 'IT2', 'I-IT'),
(23021015, 'Student O', '23021015', NULL, 50, 'IT2', 'I-IT'),
(23021016, 'Student P', '23021016', NULL, 50, 'IT2', 'I-IT'),
(23021017, 'Student Q', '23021017', NULL, 50, 'CE1', 'E-CE'),
(23021018, 'Student R', '23021018', NULL, 50, 'CE1', 'E-CE'),
(23021019, 'Student S', '23021019', NULL, 50, 'CE1', 'E-CE'),
(23021020, 'Student T', '23021020', NULL, 50, 'CE1', 'E-CE'),
(23021021, 'Student U', '23021021', NULL, 50, 'CE2', 'E-CE'),
(23021022, 'Student V', '23021022', NULL, 50, 'CE2', 'E-CE'),
(23021023, 'Student W', '23021023', NULL, 50, 'CE2', 'E-CE'),
(23021024, 'Student X', '23021024', NULL, 50, 'CE2', 'E-CE'),
(23021025, 'Student Y', '23021025', NULL, 50, 'AT1', 'M-AT'),
(23021026, 'Student Z', '23021026', NULL, 50, 'AT1', 'M-AT'),
(23021027, 'Student AA', '23021027', NULL, 50, 'AT1', 'M-AT'),
(23021028, 'Student AB', '23021028', NULL, 50, 'AT1', 'M-AT'),
(23021029, 'Student AC', '23021029', NULL, 50, 'AT2', 'M-AT'),
(23021030, 'Student AD', '23021030', NULL, 50, 'AT2', 'M-AT'),
(23021031, 'Student AE', '23021031', NULL, 50, 'AT2', 'M-AT'),
(23021032, 'Student AF', '23021032', NULL, 50, 'AT2', 'M-AT'),
(23021033, 'Student AG', '23021033', NULL, 50, 'EP', 'P-EP'),
(23021034, 'Student AH', '23021034', NULL, 50, 'EP', 'P-EP'),
(23021035, 'Student AI', '23021035', NULL, 50, 'EP', 'P-EP'),
(23021036, 'Student AJ', '23021036', NULL, 50, 'EP', 'P-EP'),
(23021037, 'Student AK', '23021037', NULL, 50, 'EE', 'P-EE'),
(23021038, 'Student AL', '23021038', NULL, 50, 'EE', 'P-EE'),
(23021039, 'Student AM', '23021039', NULL, 50, 'EE', 'P-EE'),
(23021040, 'Student AN', '23021040', NULL, 50, 'EE', 'P-EE'),
(23021041, 'Student AO', '23021041', NULL, 50, 'CE', 'C-CE'),
(23021042, 'Student AP', '23021042', NULL, 50, 'CE', 'C-CE'),
(23021043, 'Student AQ', '23021043', NULL, 50, 'CE', 'C-CE'),
(23021044, 'Student AR', '23021044', NULL, 50, 'CE', 'C-CE'),
(23021045, 'Student AS', '23021045', NULL, 50, 'CE', 'C-CE'),
(23021046, 'Student AT', '23021046', NULL, 50, 'AI', 'G-AI'),
(23021047, 'Student AU', '23021047', NULL, 50, 'AI', 'G-AI'),
(23021048, 'Student AV', '23021048', NULL, 50, 'AI', 'G-AI'),
(23021049, 'Student AW', '23021049', NULL, 50, 'AI', 'G-AI'),
(23021050, 'Student AX', '23021050', NULL, 50, 'AI', 'G-AI');

Insert into student_management.courses (id_course, credits, title)
values
('MAT1093', 4, 'Đại số'),
('MAT1041', 4, 'Giải tích 1'),
('MAT1042', 4, 'Giải tích 2'),
('EPN1095', 2, 'Vật lý đại cương 1'),
('EPN1096', 2, 'Vật lý đại cương 2'),
('INT1008', 3, 'Nhập môn lập trình'),
('ELT2035', 3, 'Tín hiệu hệ thống'),
('INT2210', 4, 'Cấu trúc dữ liệu và giải thuật'),
('MAT1101', 3, 'Xác suất thống kê'),
('INT2215', 4, 'Lập trình nâng cao'),
('INT2211', 4, 'Cơ sở dữ liệu'),
('INT2212', 4, 'Kiến trúc máy tính'),
('INT1050', 4, 'Toán rời rạc'),
('INT2214', 4, 'Nguyên lý hệ điều hành'),
('INT2213', 4, 'Mạng máy tính'),
('INT2204', 4, 'Lập trình hướng đối tượng'),
('INT2208', 3, 'Công nghệ phần mềm');

Insert into student_management.section (id_section, id_course, semester, year)
values
('MAT1093 1', 'MAT1093', 'Học kỳ I', 2024),
('MAT1093 2', 'MAT1093', 'Học kỳ I', 2024),
('MAT1041 1', 'MAT1041', 'Học kỳ I', 2024),
('MAT1041 2', 'MAT1041', 'Học kỳ I', 2024),
('EPN1095 1', 'EPN1095', 'Học kỳ I', 2024),
('EPN1095 2', 'EPN1095', 'Học kỳ I', 2024),
('INT1008 1', 'INT1008', 'Học kỳ I', 2024),
('INT1008 2', 'INT1008', 'Học kỳ I', 2024),
('ELT2035 1', 'ELT2035', 'Học kỳ I', 2024),
('INT2210 1', 'INT2210', 'Học kỳ I', 2024),
('INT2210 2', 'INT2210', 'Học kỳ I', 2024),
('MAT1101 1', 'MAT1101', 'Học kỳ I', 2024),
('MAT1101 2', 'MAT1101', 'Học kỳ I', 2024),
('INT2211 1', 'INT2211', 'Học kỳ I', 2024),
('INT2211 2', 'INT2211', 'Học kỳ I', 2024),
('INT2211 3', 'INT2211', 'Học kỳ I', 2024),
('INT2212 1', 'INT2212', 'Học kỳ I', 2024),
('INT1050 1', 'INT1050', 'Học kỳ I', 2024),
('INT1050 2', 'INT1050', 'Học kỳ I', 2024),
('INT2214 1', 'INT2214', 'Học kỳ I', 2024),
('INT2213 1', 'INT2213', 'Học kỳ I', 2024),
('INT2204 1', 'INT2204', 'Học kỳ I', 2024),
('INT2204 2', 'INT2204', 'Học kỳ I', 2024),
('INT2208 1', 'INT2208', 'Học kỳ I', 2024),
('INT2215 1', 'INT2215', 'Học kỳ I', 2024);

Insert into student_management.teaches (id_teacher, id_section)
values
(1, 'MAT1093 1'),
(1, 'MAT1093 2'),
(11, 'MAT1093 1'),
(11, 'MAT1093 2'),
(2, 'MAT1041 1'),
(2, 'MAT1041 2'),
(12, 'MAT1041 1'),
(12, 'MAT1041 2'),
(3, 'EPN1095 1'),
(3, 'EPN1095 2'),
(4, 'INT1008 1'),
(4, 'INT1008 2'),
(14, 'INT1008 1'),
(14, 'INT1008 2'),
(5, 'ELT2035 1'),
(6, 'INT2210 1'),
(6, 'INT2210 2'),
(13, 'INT2210 1'),
(13, 'INT2210 2'),
(7, 'MAT1101 1'),
(7, 'MAT1101 2'),
(8, 'INT2211 1'),
(8, 'INT2211 2'),
(8, 'INT2211 3'),
(15, 'INT2211 1'),
(15, 'INT2211 2'),
(15, 'INT2211 3'),
(9, 'INT2212 1'),
(10, 'INT1050 1'),
(10, 'INT1050 2'),
(16, 'INT2214 1'),
(17, 'INT2214 1'),
(18, 'INT2213 1'),
(19, 'INT2204 1'),
(19, 'INT2204 2'),
(20, 'INT2208 1'),
(14, 'INT2215 1');

insert into student_management.time(id_time, id_section, day, start_time, end_time, room_number)
values
(1, 'MAT1093 1', 'Thứ 2', '10:00:00','12:00:00', '101-G2'),
(2, 'MAT1093 2', 'Thứ 5', '09:00:00','11:00:00', '107-G2'),
(3, 'MAT1041 1', 'Thứ 2', '13:00:00','17:00:00', '101-G2'),
(4, 'MAT1041 2', 'Thứ 6', '08:00:00','10:00:00', '205-GĐ3'),
(5, 'EPN1095 1', 'Thứ 7', '09:00:00','11:00:00', '101-G2'),
(6, 'EPN1095 2', 'Thứ 3', '13:00:00','15:00:00', '209-GĐ3'),
(7, 'INT1008 1', 'Thứ 3', '09:00:00','12:00:00', '101-G2'),
(8, 'INT1008 2', 'Thứ 6', '15:00:00','17:00:00', '208-GĐ3'),
(9, 'ELT2035 1', 'Thứ 4', '13:00:00','16:00:00', '207-GĐ3'),
(10, 'INT2210 1', 'Thứ 3', '13:00:00','15:00:00', '310-GĐ2'),
(11, 'INT2210 2', 'Thứ 6', '15:00:00','17:00:00', '101-G2'),
(12, 'MAT1101 1', 'Thứ 2', '07:00:00','10:00:00', '101-G2'),
(13, 'MAT1101 2', 'Thứ 5', '09:00:00','12:00:00', '301-GĐ2'),
(14, 'INT2211 1', 'Thứ 3', '10:00:00','12:00:00', '205-GĐ3'),
(15, 'INT2211 2', 'Thứ 5', '13:00:00','15:00:00', '206-GĐ3'),
(16, 'INT2211 3', 'Thứ 7', '07:00:00','09:00:00', '201-GĐ3'),
(17, 'INT2212 1', 'Thứ 4', '13:00:00','17:00:00', '202-GĐ3'),
(18, 'INT1050 1', 'Thứ 6', '08:00:00','12:00:00', '203-GĐ3'),
(19, 'INT1050 2', 'Thứ 3', '14:00:00','18:00:00', '204-GĐ3'),
(20, 'INT2204 1', 'Thứ 5', '13:00:00','15:00:00', '205-GĐ3'),
(21, 'INT2204 2', 'Thứ 7', '09:00:00','11:00:00', '206-GĐ3'),
(22, 'INT2214 1', 'Thứ 3', '13:00:00','17:00:00', '307-GĐ2'),
(23, 'INT2213 1', 'Thứ 4', '13:00:00','17:00:00', '308-GĐ2'),
(24, 'INT2208 1', 'Thứ 2', '09:00:00','11:00:00', '107-G2'),
(25, 'INT2215 1', 'Thứ 6', '13:00:00','15:00:00', '107-G2');

insert into student_management.takes (id, id_section, status, year, grade)
values
(23021001, 'MAT1093 1', 'Học lần đầu', 2024, NULL),
(23021002, 'MAT1093 2', 'Học lần đầu', 2024, NULL),
(23021003, 'MAT1093 1', 'Học lần đầu', 2024, NULL),
(23021004, 'MAT1093 2', 'Học lần đầu', 2024, NULL),
(23021005, 'MAT1093 1', 'Học lần đầu', 2024, NULL),
(23021006, 'MAT1093 2', 'Học lần đầu', 2024, NULL),
(23021007, 'MAT1093 1', 'Học lần đầu', 2024, NULL),
(23021008, 'MAT1093 2', 'Học lần đầu', 2024, NULL),
(23021009, 'MAT1093 1', 'Học lần đầu', 2024, NULL),
(23021010, 'MAT1093 2', 'Học lần đầu', 2024, NULL),
(23021011, 'MAT1041 1', 'Học lần đầu', 2024, NULL),
(23021012, 'MAT1041 2', 'Học lần đầu', 2024, NULL),
(23021013, 'MAT1041 1', 'Học lần đầu', 2024, NULL),
(23021014, 'MAT1041 2', 'Học lần đầu', 2024, NULL),
(23021015, 'MAT1041 1', 'Học lần đầu', 2024, NULL),
(23021016, 'MAT1041 2', 'Học lần đầu', 2024, NULL),
(23021017, 'MAT1041 1', 'Học lần đầu', 2024, NULL),
(23021018, 'MAT1041 2', 'Học lần đầu', 2024, NULL),
(23021019, 'MAT1041 1', 'Học lần đầu', 2024, NULL),
(23021020, 'MAT1041 2', 'Học lần đầu', 2024, NULL),
(23021021, 'EPN1095 1', 'Học lần đầu', 2024, NULL),
(23021022, 'EPN1095 2', 'Học lần đầu', 2024, NULL),
(23021023, 'EPN1095 1', 'Học lần đầu', 2024, NULL),
(23021024, 'EPN1095 2', 'Học lần đầu', 2024, NULL),
(23021025, 'EPN1095 1', 'Học lần đầu', 2024, NULL),
(23021026, 'INT1008 1', 'Học lần đầu', 2024, NULL),
(23021027, 'INT1008 2', 'Học lần đầu', 2024, NULL),
(23021028, 'INT1008 1', 'Học lần đầu', 2024, NULL),
(23021029, 'INT1008 2', 'Học lần đầu', 2024, NULL),
(23021030, 'INT1008 2', 'Học lần đầu', 2024, NULL),
(23021031, 'INT2210 1', 'Học lần đầu', 2024, NULL),
(23021032, 'INT2210 2', 'Học lần đầu', 2024, NULL),
(23021033, 'INT2210 1', 'Học lần đầu', 2024, NULL),
(23021034, 'INT2210 2', 'Học lần đầu', 2024, NULL),
(23021035, 'INT2210 1', 'Học lần đầu', 2024, NULL),
(23021036, 'INT2210 2', 'Học lần đầu', 2024, NULL),
(23021037, 'INT2210 1', 'Học lần đầu', 2024, NULL),
(23021038, 'INT2210 2', 'Học lần đầu', 2024, NULL),
(23021039, 'INT2210 1', 'Học lần đầu', 2024, NULL),
(23021040, 'INT2210 2', 'Học lần đầu', 2024, NULL),
(23021041, 'MAT1101 1', 'Học lần đầu', 2024, NULL),
(23021042, 'MAT1101 2', 'Học lần đầu', 2024, NULL),
(23021043, 'MAT1101 1', 'Học lần đầu', 2024, NULL),
(23021044, 'MAT1101 2', 'Học lần đầu', 2024, NULL),
(23021045, 'MAT1101 1', 'Học lần đầu', 2024, NULL),
(23021046, 'INT2211 1', 'Học lần đầu', 2024, NULL),
(23021047, 'INT2211 1', 'Học lần đầu', 2024, NULL),
(23021048, 'INT2211 1', 'Học lần đầu', 2024, NULL),
(23021049, 'INT2211 2', 'Học lần đầu', 2024, NULL),
(23021050, 'INT2211 2', 'Học lần đầu', 2024, NULL),
(23021042, 'INT2211 2', 'Học lần đầu', 2024, NULL),
(23021043, 'INT2211 3', 'Học lần đầu', 2024, NULL),
(23021044, 'INT2211 3', 'Học lần đầu', 2024, NULL),
(23021045, 'INT2211 3', 'Học lần đầu', 2024, NULL),
(23021049, 'INT2214 1', 'Học lần đầu', 2024, NULL),
(23021002, 'INT2214 1', 'Học lần đầu', 2024, NULL),
(23021003, 'INT2214 1', 'Học lần đầu', 2024, NULL),
(23021004, 'INT2214 1', 'Học lần đầu', 2024, NULL),
(23021005, 'INT2214 1', 'Học lần đầu', 2024, NULL),
(23021006, 'INT2204 1', 'Học cải thiện', 2024, NULL),
(23021007, 'INT2204 2', 'Học cải thiện', 2024, NULL),
(23021008, 'INT2204 1', 'Học cải thiện', 2024, NULL),
(23021009, 'INT2204 2', 'Học cải thiện', 2024, NULL),
(23021010, 'INT2204 2', 'Học cải thiện', 2024, NULL),
(23021011, 'INT2212 1', 'Học cải thiện', 2024, NULL),
(23021012, 'INT2212 1', 'Học cải thiện', 2024, NULL),
(23021013, 'INT2212 1', 'Học cải thiện', 2024, NULL),
(23021014, 'INT2212 1', 'Học cải thiện', 2024, NULL),
(23021015, 'INT2212 1', 'Học cải thiện', 2024, NULL),
(23021016, 'INT2212 1', 'Học cải thiện', 2024, NULL),
(23021017, 'INT2212 1', 'Học cải thiện', 2024, NULL),
(23021018, 'INT2212 1', 'Học cải thiện', 2024, NULL),
(23021019, 'INT2212 1', 'Học cải thiện', 2024, NULL),
(23021020, 'INT2212 1', 'Học cải thiện', 2024, NULL);