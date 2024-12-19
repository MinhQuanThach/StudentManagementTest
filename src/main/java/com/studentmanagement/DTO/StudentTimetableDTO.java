package com.studentmanagement.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Setter
@Getter
@Data
@AllArgsConstructor
public class StudentTimetableDTO {
    private Integer studentId;
    private String studentName;
    private String sectionId;
    private String courseTitle;
    private String day;
    private Time startTime;
    private Time endTime;
    private String roomNumber;
}

