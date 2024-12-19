package com.studentmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Setter
@Getter
@Entity
@Table(name = "time")
public class Time {
    // Getters and Setters
    @Id
    @Column(name = "id_time", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTime;

    @ManyToOne
    @JoinColumn(name = "id_section", nullable = false) // Maps the foreign key
    private Section section;

    @Column(name = "day", nullable = false)
    private String day;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "room_number")
    private String roomNumber;

}
