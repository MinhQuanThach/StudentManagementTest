package com.studentmanagement.service;

import com.studentmanagement.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    List<Student> getAllStudents();

    Optional<Student> getStudentById(Integer id);

    List<Student> searchStudentsById(String query);

    List<Student> searchStudentsByName(String query);

    List<Student> searchStudentsByIndustry(String query);

    List<Student> searchStudentsByIdClass(String query);

    List<Student> searchStudents(String query);

    Student createStudent(Student student);

    Student updateStudent(Integer id, Student updatedStudent);

    void deleteStudent(Integer id);
}
