package com.studentmanagement.repository;

import com.studentmanagement.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    @Query("SELECT s FROM Student s WHERE " +
            "LOWER(s.name) LIKE %:query% OR " +
            "CAST(s.birthday AS string) LIKE %:query% OR " +
            "CAST(s.id AS string) LIKE %:query% OR " +
            "CAST(s.idClass AS string) LIKE %:query% OR " +
            "CAST(s.industry AS string) LIKE %:query%")
    List<Student> searchStudents(@Param("query") String query);

    @Query("SELECT s FROM Student s WHERE CAST(s.id AS string) LIKE %:query%")
    List<Student> findStudentsByIdContaining(@Param("query") String query);

    @Query("SELECT s FROM Student s WHERE s.name LIKE %:query%")
    List<Student> findStudentsByNameContaining(@Param("query") String query);

    @Query("SELECT s FROM Student s WHERE s.industry.idIndustry LIKE %:query%")
    List<Student> findStudentsByIndustryContaining(@Param("query") String query);

    @Query("SELECT s FROM Student s WHERE s.idClass LIKE %:query%")
    List<Student> findStudentsByIdClassContaining(@Param("query") String query);


}


