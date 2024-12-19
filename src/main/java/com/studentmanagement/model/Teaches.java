package com.studentmanagement.model;

import com.studentmanagement.ID.TeachesId;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "teaches")
@Getter
@Setter
public class Teaches {
    @EmbeddedId
    private TeachesId id;

    @ManyToOne
    @MapsId("idTeacher")
    @JoinColumn(name = "id_teacher")
    private Teacher teacher;

    @ManyToOne
    @MapsId("idSection")
    @JoinColumn(name = "id_section")
    private Section section;

    public Teaches() {
    }

    public Teaches(TeachesId id, Teacher teacher, Section section) {
        this.id = id;
        this.teacher = teacher;
        this.section = section;
    }
}
