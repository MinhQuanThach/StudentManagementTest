package com.studentmanagement.service;

import com.studentmanagement.DTO.StudentTimetableDTO;
import com.studentmanagement.repository.StudentTimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentTimetableService {
    @Autowired
    private StudentTimetableRepository studentTimetableRepository;

    public List<StudentTimetableDTO> getTimetableByStudentId(Integer studentId) {
        List<Object[]> results = studentTimetableRepository.findTimetableByStudentId(studentId);

        return results.stream()
                .map(row -> new StudentTimetableDTO(
                        (Integer) row[0],  // studentId
                        (String) row[1], // studentName
                        (String) row[2],  // sectionId
                        (String) row[3], // courseTitle
                        (String) row[4], // day
                        (Time) row[5], // startTime
                        (Time) row[6], // endTime
                        (String) row[7]  // roomNumber
                ))
                .collect(Collectors.toList());
    }
}

