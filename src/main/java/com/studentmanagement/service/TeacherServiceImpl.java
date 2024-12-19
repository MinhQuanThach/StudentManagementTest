package com.studentmanagement.service;

import com.studentmanagement.model.Teacher;
import com.studentmanagement.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherServiceImpl implements TeacherService {
    private final TeacherRepository teacherRepository;

    @Autowired
    public TeacherServiceImpl(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public Optional<Teacher> getTeacherById(Integer idTeacher) {
        return teacherRepository.findById(idTeacher);
    }

    @Override
    public List<Teacher> searchTeachers(String type, String query) {
        switch (type.toLowerCase()) {
            case "id":
                return teacherRepository.findTeachersByIdContaining(query);
            case "industry":
                return teacherRepository.findTeachersByNameContaining(query);
            case "idclass":
                return teacherRepository.findTeachersByBirthdayContaining(query);
            case "name":
                return teacherRepository.findTeachersByEmailContaining(query);
            default:
                throw new IllegalArgumentException("Invalid search type: " + type);
        }
    }

    @Override
    public Teacher createTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @Override
    public Teacher updateTeacher(Integer idTeacher, Teacher updatedTeacher) {
        Optional<Teacher> existingTeacher = teacherRepository.findById(idTeacher);
        if (existingTeacher.isPresent()) {
            Teacher teacher = existingTeacher.get();
            teacher.setEmail(updatedTeacher.getEmail());
            teacher.setName(updatedTeacher.getName());
            teacher.setBirthday(updatedTeacher.getBirthday());
            return teacherRepository.save(teacher);
        } else {
            throw new RuntimeException("Teacher with ID " + idTeacher + " not found.");
        }
    }

    @Override
    public void deleteTeacher(Integer idTeacher) {
        if (teacherRepository.existsById(idTeacher)) {
            teacherRepository.deleteById(idTeacher);
        } else {
            throw new RuntimeException("Teacher with ID " + idTeacher + " not found.");
        }
    }
}