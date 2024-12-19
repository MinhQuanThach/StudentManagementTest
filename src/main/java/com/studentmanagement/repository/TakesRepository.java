package com.studentmanagement.repository;

import com.studentmanagement.ID.TakesId;
import com.studentmanagement.model.Takes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface TakesRepository extends JpaRepository<Takes, TakesId> {
    @Query("SELECT t FROM Takes t WHERE CAST(t.student.id AS string) LIKE %:idStudent%")
    List<Takes> findTakesByStudentIdContaining(@Param("idStudent") String idStudent);

    @Query("SELECT t FROM Takes t WHERE t.section.idSection LIKE %:idSection%")
    List<Takes> findTakesBySectionIdContaining(@Param("idSection") String idSection);

    @Query("SELECT t FROM Takes t WHERE CAST(t.status AS string) LIKE %:status%")
    List<Takes> findTakesByStatusContaining(@Param("status") String status);

    @Query("SELECT t FROM Takes t WHERE CAST(t.year AS string) LIKE %:year%")
    List<Takes> findTakesByYearContaining(@Param("year") String year);

    @Query("SELECT t FROM Takes t WHERE CAST(t.grade AS string) LIKE %:grade%")
    List<Takes> findTakesByGradeContaining(@Param("grade") String grade);

    @Query("SELECT s.idSection AS id_section, s.semester AS semester, t.status AS status, c.title AS course_title, s.year as year " +
            "FROM Takes t " +
            "JOIN Section s ON t.section.idSection = s.idSection " +
            "JOIN Course c ON s.course.idCourse = c.idCourse " +
            "WHERE t.student.id = :studentId AND s.year = (SELECT MAX(s2.year) FROM Section s2)")
    List<Object[]> findSectionsWithStatusByStudentId(@Param("studentId") Integer studentId);

    @Query("SELECT t.year, s.semester AS section_semester, t.grade, c.idCourse as idCourse, c.title as title, c.credits credits " +
            "FROM Takes t " +
            "JOIN Section s ON t.section.idSection = s.idSection " +
            "JOIN Course c on s.course.idCourse = c.idCourse " +
            "WHERE t.grade is not null and t.student.id = :studentId " +
            "ORDER BY t.year, s.semester")
    List<Object[]> findGradesByStudentId(Integer studentId);


}