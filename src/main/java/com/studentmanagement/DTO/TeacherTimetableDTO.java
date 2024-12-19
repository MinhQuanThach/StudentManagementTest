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
public class TeacherTimetableDTO {
    private Integer teacherId;
    private String teacherName;
    private String sectionId;
    private String courseTitle;
    private String day;
    private Time startTime;
    private Time endTime;
    private String roomNumber;
}

