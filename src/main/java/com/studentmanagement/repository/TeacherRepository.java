package com.studentmanagement.repository;

import com.studentmanagement.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
    @Query("SELECT t FROM Teacher t WHERE CAST(t.idTeacher AS string) LIKE %:query%")
    List<Teacher> findTeachersByIdContaining(@Param("query") String query);

    @Query("SELECT t FROM Teacher t WHERE t.name LIKE %:query%")
    List<Teacher> findTeachersByNameContaining(@Param("query") String query);

    @Query("SELECT t FROM Teacher t WHERE t.email LIKE %:query%")
    List<Teacher> findTeachersByEmailContaining(@Param("query") String query);

    @Query("SELECT t FROM Teacher t WHERE CAST(t.birthday AS string) LIKE %:birthday%")
    List<Teacher> findTeachersByBirthdayContaining(@Param("birthday") String birthday);


}