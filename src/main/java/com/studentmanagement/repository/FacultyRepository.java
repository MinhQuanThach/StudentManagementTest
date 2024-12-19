package com.studentmanagement.repository;

import com.studentmanagement.model.Course;
import com.studentmanagement.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FacultyRepository extends JpaRepository<Faculty, String> {
    @Query("SELECT f FROM Faculty f WHERE f.idFaculty LIKE %:idFaculty%")
    List<Faculty> findByIdFacultyContaining(@Param("idFaculty") String idFaculty);

    @Query("SELECT f FROM Faculty f WHERE f.title LIKE %:title%")
    List<Faculty> findByTitleContaining(@Param("title") String title);

    @Query("SELECT f FROM Faculty f WHERE CAST(f.numberTeacher AS string) = :numberTeacher")
    List<Faculty> findByNumberTeacher(@Param("numberTeacher") String numberTeacher);

    @Query("SELECT f FROM Faculty f WHERE CAST(f.numberStudent AS string) = :numberStudent")
    List<Faculty> findByNumberStudent(@Param("numberStudent") String numberStudent);
}
