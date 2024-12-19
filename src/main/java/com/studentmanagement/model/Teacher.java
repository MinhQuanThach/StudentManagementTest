package com.studentmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "teacher")
public class Teacher {
    @Id
    @Column(name = "id_teacher", nullable = false)
    private Integer idTeacher;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "birthday")
    private LocalDate birthday;
}
