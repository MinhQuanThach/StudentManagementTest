package com.studentmanagement.model;

import com.studentmanagement.ID.TakesId;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "takes")
public class Takes {

    @EmbeddedId
    private TakesId idTake;

    @ManyToOne
    @MapsId("idStudent")
    @JoinColumn(name = "id")
    private Student student;

    @ManyToOne
    @MapsId("idSection")
    @JoinColumn(name = "id_section")
    private Section section;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "year")
    private Integer year;

    @Column(name = "grade")
    private Double grade;
}
