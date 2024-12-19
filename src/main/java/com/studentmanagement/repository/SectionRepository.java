package com.studentmanagement.repository;

import com.studentmanagement.model.Section;
import com.studentmanagement.model.Time;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectionRepository extends JpaRepository<Section, String> {
    @Query("SELECT s FROM Section s WHERE s.idSection LIKE %:sectionId%")
    List<Section> findSectionsBySectionIdContaining(@Param("sectionId") String sectionId);

    @Query("SELECT s FROM Section s WHERE s.course.idCourse LIKE %:course%")
    List<Section> findSectionsByCourseContaining(@Param("course") String course);

    @Query("SELECT s FROM Section s WHERE s.semester LIKE %:semester%")
    List<Section> findSectionsBySemesterContaining(@Param("semester") String semester);

    @Query("SELECT s FROM Section s WHERE cast(s.year as string) LIKE %:year%")
    List<Section> findSectionsByYearContaining(@Param("year") String year);

    @Query("SELECT s FROM Section s " +
            "ORDER BY s.year DESC, " +
            "CASE " +
            "WHEN s.semester = 'Học kỳ I' THEN 1 " +
            "WHEN s.semester = 'Học kỳ II' THEN 2 " +
            "WHEN s.semester = 'Học kỳ phụ' THEN 3 " +
            "ELSE 4 " +
            "END")
    List<Section> findLatestSemester();
}
