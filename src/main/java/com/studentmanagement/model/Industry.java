package com.studentmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "industry")
public class Industry {
    @Id
    @Column(name = "id_industry", length = 15, nullable = false)
    private String idIndustry; // Primary Key

    @ManyToOne
    @JoinColumn(name = "id_faculty", nullable = false) // Foreign key in the 'industry' table
    private Faculty faculty;

    @Column(name = "year_number", nullable = false)
    private Double yearNumber;

    @Column(name = "title", length = 50, nullable = false)
    private String title;
}
