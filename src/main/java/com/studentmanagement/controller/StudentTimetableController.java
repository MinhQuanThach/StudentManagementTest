package com.studentmanagement.controller;

import com.studentmanagement.DTO.StudentTimetableDTO;
import com.studentmanagement.service.StudentTimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/student_timetable")
public class StudentTimetableController {
    @Autowired
    private StudentTimetableService timetableService;

    @GetMapping("/{studentId}")
    public ResponseEntity<List<StudentTimetableDTO>> getTimetableByStudentId(@PathVariable Integer studentId) {
        List<StudentTimetableDTO> timetable = timetableService.getTimetableByStudentId(studentId);
        if (timetable.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(timetable);
    }
}

