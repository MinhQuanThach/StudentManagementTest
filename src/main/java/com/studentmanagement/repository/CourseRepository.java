package com.studentmanagement.repository;

import com.studentmanagement.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, String> {
    @Query("SELECT c FROM Course c WHERE CAST(c.idCourse AS string) LIKE %:idCourse%")
    List<Course> findByIdCourseContaining(@Param("idCourse") String idCourse);

    @Query("SELECT c FROM Course c WHERE CAST(c.credits as string) = :credits")
    List<Course> findByCredits(@Param("credits") String credits);

    @Query("SELECT c FROM Course c WHERE c.title LIKE %:title%")
    List<Course> findByTitleContaining(@Param("title") String title);
}
