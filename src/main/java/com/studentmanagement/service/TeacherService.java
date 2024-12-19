package com.studentmanagement.service;

import com.studentmanagement.model.Teacher;

import java.util.List;
import java.util.Optional;

public interface TeacherService {
    List<Teacher> getAllTeachers();

    Optional<Teacher> getTeacherById(Integer idTeacher);

    List<Teacher> searchTeachers(String type, String query);

    Teacher createTeacher(Teacher teacher);

    Teacher updateTeacher(Integer idTeacher, Teacher updatedTeacher);

    void deleteTeacher(Integer idTeacher);
}