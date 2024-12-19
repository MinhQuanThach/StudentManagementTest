package com.studentmanagement.repository;

import com.studentmanagement.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherTimetableRepository extends JpaRepository<Teacher, String> {
    @Query(value = "SELECT tch.id_teacher AS teacherId, tch.name AS teacherName, " +
            "st.id_section AS sectionId, c.title AS courseTitle, " +
            "t.day AS day, t.start_time AS startTime, t.end_time AS endTime, t.room_number AS roomNumber " +
            "FROM teacher tch " +
            "JOIN teaches ts ON tch.id_teacher = ts.id_teacher " +
            "JOIN section st ON st.id_section = ts.id_section " +
            "JOIN courses c ON c.id_course = st.id_course " +
            "JOIN time t ON t.id_section = st.id_section " +
            "WHERE tch.name = :teacherName", nativeQuery = true)
    List<Object[]> findTimetableByTeacherName(@Param("teacherName") String teacherName);
}

