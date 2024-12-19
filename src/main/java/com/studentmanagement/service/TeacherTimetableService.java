package com.studentmanagement.service;

import com.studentmanagement.DTO.TeacherTimetableDTO;
import com.studentmanagement.repository.TeacherTimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherTimetableService {
    @Autowired
    private TeacherTimetableRepository teacherTimetableRepository;

    public List<TeacherTimetableDTO> getTimetableByTeacherName(String teacherName) {
        List<Object[]> results = teacherTimetableRepository.findTimetableByTeacherName(teacherName);

        return results.stream()
                .map(row -> new TeacherTimetableDTO(
                        (Integer) row[0],  // teacherId
                        (String) row[1], // teacherName
                        (String) row[2],  // sectionId
                        (String) row[3], // courseTitle
                        (String) row[4], //day
                        (Time) row[5], // startTime
                        (Time) row[6], // endTime
                        (String) row[7]  // roomNumber
                ))
                .collect(Collectors.toList());
    }
}

