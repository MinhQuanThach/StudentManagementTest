package com.studentmanagement.ID;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class TeachesId implements Serializable {
    private Integer idTeacher;
    private String idSection;

    public TeachesId() {}

    public TeachesId(Integer idTeacher, String idSection) {
        this.idTeacher = idTeacher;
        this.idSection = idSection;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TeachesId)) return false;
        TeachesId that = (TeachesId) o;
        return Objects.equals(idTeacher, that.idTeacher) &&
                Objects.equals(idSection, that.idSection);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idTeacher, idSection);
    }
}

