package com.studentmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "student")
public class Student {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "credits", nullable = false)
    private Integer credits;

    @Column(name = "id_class", nullable = false)
    private String idClass;

    @ManyToOne
    @JoinColumn(name = "id_industry") // Foreign key to industry table
    private Industry industry;

}
