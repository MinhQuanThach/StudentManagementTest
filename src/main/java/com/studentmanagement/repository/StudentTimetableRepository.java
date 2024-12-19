package com.studentmanagement.repository;

import com.studentmanagement.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentTimetableRepository extends JpaRepository<Student, Integer> {
    @Query(value = "SELECT s.id AS studentId, s.name AS studentName, " +
            "st.id_section AS sectionId, c.title AS courseTitle,  " +
            "t.day AS day, t.start_time AS startTime, t.end_time AS endTime, t.room_number AS roomNumber " +
            "FROM student s " +
            "JOIN takes tk ON s.id = tk.id " +
            "JOIN section st ON tk.id_section = st.id_section " +
            "JOIN courses c ON st.id_course = c.id_course " +
            "JOIN time t ON st.id_section = t.id_section " +
            "WHERE s.id = :studentId", nativeQuery = true)
    List<Object[]> findTimetableByStudentId(@Param("studentId") Integer studentId);
}

