package com.studentmanagement.ID;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class TakesId implements Serializable {
    private Integer idStudent;
    private String idSection;

    // Constructors, Getters, Setters, hashCode, equals

    public TakesId() {
    }

    public TakesId(Integer studentId, String sectionId) {
        this.idStudent = studentId;
        this.idSection = sectionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TakesId takesId = (TakesId) o;
        return Objects.equals(idStudent, takesId.idStudent) && Objects.equals(idSection, takesId.idSection);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idStudent, idSection);
    }
}
