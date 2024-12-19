package com.studentmanagement.controller;

import com.studentmanagement.DTO.TeacherTimetableDTO;
import com.studentmanagement.service.TeacherTimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/teacher_timetable")
public class TeacherTimetableController {
    @Autowired
    private TeacherTimetableService timetableService;

    @GetMapping("/{teacherName}")
    public ResponseEntity<List<TeacherTimetableDTO>> getTimetableByTeacherName(@PathVariable String teacherName) {
        List<TeacherTimetableDTO> timetable = timetableService.getTimetableByTeacherName(teacherName);
        if (timetable.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(timetable);
    }
}
