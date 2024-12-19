package com.studentmanagement.repository;

import com.studentmanagement.model.Section;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Transactional
@Repository
public interface SectionAvailableRepository extends JpaRepository<Section, Integer> {
    @Query(value = "SELECT " +
            "    st.id_section AS sectionId, " +
            "    c.title AS courseTitle, " +
            "    c.credits AS credits, " +
            "    GROUP_CONCAT(DISTINCT tch.name ORDER BY tch.name ASC) AS teacherNames," +
            "    t.day AS day, " +
            "    t.start_time AS startTime, " +
            "    t.end_time AS endTime, " +
            "    t.room_number AS roomNumber " +
            "FROM section st " +
            "JOIN courses c ON st.id_course = c.id_course " +
            "JOIN time t ON st.id_section = t.id_section " +
            "JOIN teaches ts ON ts.id_section = st.id_section " +
            "JOIN teacher tch ON tch.id_teacher = ts.id_teacher " +
            "WHERE st.semester = :semester AND st.year = :year " +
            "GROUP BY st.id_section, c.title, c.credits, t.day, t.start_time, t.end_time, t.room_number", nativeQuery = true)
    List<Object[]> findSectionsBySemesterAndYear(@Param("semester") String semester, @Param("year") int year);

    @Query(value = "SELECT " +
            "    st.id_section AS sectionId, " +
            "    c.title AS courseTitle, " +
            "    c.credits AS credits, " +
            "    GROUP_CONCAT(DISTINCT tch.name ORDER BY tch.name ASC) AS teacherNames," +
            "    t.day AS day, " +
            "    t.start_time AS startTime, " +
            "    t.end_time AS endTime, " +
            "    t.room_number AS roomNumber " +
            "FROM section st " +
            "JOIN courses c ON st.id_course = c.id_course " +
            "JOIN time t ON st.id_section = t.id_section " +
            "JOIN teaches ts ON ts.id_section = st.id_section " +
            "JOIN teacher tch ON tch.id_teacher = ts.id_teacher " +
            "JOIN takes ta ON ta.id_section = st.id_section " +
            "WHERE st.semester = :semester AND st.year = :year AND ta.id = :idStudent " +
            "GROUP BY st.id_section, c.title, c.credits, t.day, t.start_time, t.end_time, t.room_number", nativeQuery = true)
    List<Object[]> findSectionsBySemesterAndYearAndIdStudent(@Param("semester") String semester, @Param("year") int year, @Param("idStudent") Integer idStudent);

    @Transactional
    @Modifying
    @Query("DELETE FROM Takes ta WHERE ta.student.id = :idStudent AND ta.section.semester = :semester AND ta.section.year = :year")
    void deleteTakesByStudentAndSemesterAndYear(@Param("idStudent") Integer idStudent,
                                                @Param("semester") String semester,
                                                @Param("year") int year);







}
