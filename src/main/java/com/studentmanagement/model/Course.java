package com.studentmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @Column(name = "id_course", nullable = false)
    private String idCourse;

    @Column(name = "credits", nullable = false)
    private Integer credits;

    @Column(name = "title", nullable = false, length = 100)
    private String title;
}
