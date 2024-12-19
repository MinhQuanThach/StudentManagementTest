package com.studentmanagement.controller;

import com.studentmanagement.model.Student;
import com.studentmanagement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Retrieve all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Integer id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @GetMapping("/search")
    public ResponseEntity<List<Student>> searchStudents(@RequestParam("query") String query) {
        List<Student> students = studentService.searchStudents(query);
        if (students.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content nếu không có sinh viên nào
        }
        return ResponseEntity.ok(students); // 200 OK kèm danh sách sinh viên
    }

    @GetMapping("/find")
    public ResponseEntity<List<Student>> findStudentsByQuery(
            @RequestParam String filter, @RequestParam String query) {
        List<Student> students;

        if (filter == null || query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        switch (filter.toLowerCase()) {
            case "id":
                students = studentService.searchStudentsById(query);
                break;
            case "name":
                students = studentService.searchStudentsByName(query);
                break;
            case "industry":
                students = studentService.searchStudentsByIndustry(query);
                break;
            case "idclass":
                students = studentService.searchStudentsByIdClass(query);
                break;
            default:
                return ResponseEntity.badRequest().body(null);
        }

        if (students.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(students);
    }



    // Add a new student
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student createdStudent = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
    }

    // Update an existing student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Integer id, @RequestBody Student updatedStudent) {
        Optional<Student> existingStudent = studentService.getStudentById(id);
        if (existingStudent.isPresent()) {
            updatedStudent.setId(id);
            Student savedStudent = studentService.updateStudent(id, updatedStudent);
            return ResponseEntity.ok(savedStudent);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a student by ID
    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Integer id) {
        if (studentService.getStudentById(id).isPresent()) {
            studentService.deleteStudent(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/students")
    public String getStudentsPage(Model model) {
        List<Student> students = studentService.getAllStudents();  // Lấy danh sách sinh viên từ service
        model.addAttribute("students", students);  // Thêm danh sách vào model
        return "students";  // Trả về trang students.html
    }


}
