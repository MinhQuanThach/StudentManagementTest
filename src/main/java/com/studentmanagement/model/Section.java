package com.studentmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "section")
@Setter
@Getter
public class Section {
    @Id
    @Column(name = "id_section", length = 15, nullable = false)
    private String idSection;

    @ManyToOne
    @JoinColumn(name = "id_course", nullable = false)
    private Course course;

    @Column(name = "semester", length = 25, nullable = false)
    private String semester;

    @Column(name = "year", nullable = false)
    private int year;
}
