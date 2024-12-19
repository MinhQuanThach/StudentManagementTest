package com.studentmanagement.controller;


import com.studentmanagement.model.Student;
import com.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private StudentRepository studentRepository; // Inject the StudentRepository

    @PostMapping
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password, @RequestParam String role) {
        if ("manager".equals(role)) {
            if ("admin".equals(username) && "admin".equals(password)) {
                return ResponseEntity.ok("manager"); // Manager login success
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        } else if ("student".equals(role)) {
            Optional<Student> student = studentRepository.findById(Integer.valueOf(username));
            if (student.isPresent() && student.get().getPassword().equals(password)) {
                return ResponseEntity.ok(student.get().getId()); // Return student ID on success
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
        return ResponseEntity.badRequest().body("Invalid role");
    }
}
