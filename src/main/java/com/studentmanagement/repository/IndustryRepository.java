package com.studentmanagement.repository;

import com.studentmanagement.model.Industry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IndustryRepository extends JpaRepository<Industry, String> {
    @Query("SELECT i FROM Industry i WHERE i.idIndustry LIKE %:idIndustry%")
    List<Industry> findByIdIndustryContaining(@Param("idIndustry") String idIndustry);

    @Query("SELECT i FROM Industry i WHERE i.faculty.idFaculty LIKE %:idFaculty%")
    List<Industry> findByFacultyIdContaining(@Param("idFaculty") String idFaculty);

    @Query("SELECT i FROM Industry i WHERE Cast(i.yearNumber as string) = :yearNumber")
    List<Industry> findByYearNumber(@Param("yearNumber") String yearNumber);

    @Query("SELECT i FROM Industry i WHERE i.title LIKE %:title%")
    List<Industry> findByTitleContaining(@Param("title") String title);
}
