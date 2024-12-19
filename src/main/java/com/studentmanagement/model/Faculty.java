package com.studentmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "faculty")
public class Faculty {
    @Id
    @Column(name = "id_faculty", length = 15, nullable = false)
    private String idFaculty;

    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "number_teacher")
    private Integer numberTeacher;

    @Column(name = "number_student")
    private Integer numberStudent;
}
