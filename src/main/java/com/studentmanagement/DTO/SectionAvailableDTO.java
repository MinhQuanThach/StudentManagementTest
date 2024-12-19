package com.studentmanagement.DTO;

import lombok.*;

import java.sql.Time;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SectionAvailableDTO {
    private String sectionId;
    private String courseTitle;
    private int credits;
    private String teacherName;
    private String day;
    private Time startTime;
    private Time endTime;
    private String roomNumber;
}
