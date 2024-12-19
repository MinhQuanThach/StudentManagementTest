package com.studentmanagement.service;

import com.studentmanagement.model.Faculty;
import com.studentmanagement.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacultyServiceImpl implements FacultyService {
    private final FacultyRepository facultyRepository;

    @Autowired
    public FacultyServiceImpl(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    @Override
    public List<Faculty> getAllFaculties() {
        return facultyRepository.findAll();
    }

    @Override
    public Optional<Faculty> getFacultyById(String idFaculty) {
        return facultyRepository.findById(idFaculty);
    }

    @Override
    public List<Faculty> searchByIdFaculty(String idFaculty) {
        return facultyRepository.findByIdFacultyContaining(idFaculty);
    }

    @Override
    public List<Faculty> searchByTitle(String title) {
        return facultyRepository.findByTitleContaining(title);
    }

    @Override
    public List<Faculty> searchByNumberTeacher(String numberTeacher) {
        return facultyRepository.findByNumberTeacher(numberTeacher);
    }

    @Override
    public List<Faculty> searchByNumberStudent(String numberStudent) {
        return facultyRepository.findByNumberStudent(numberStudent);
    }

    @Override
    public Faculty createFaculty(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    @Override
    public Faculty updateFaculty(String idFaculty, Faculty updatedFaculty) {
        Optional<Faculty> existingFaculty = facultyRepository.findById(idFaculty);
        if (existingFaculty.isPresent()) {
            Faculty faculty = existingFaculty.get();
            faculty.setTitle(updatedFaculty.getTitle());
            faculty.setNumberTeacher(updatedFaculty.getNumberTeacher());
            faculty.setNumberStudent(updatedFaculty.getNumberStudent());
            return facultyRepository.save(faculty);
        } else {
            throw new RuntimeException("Faculty with ID " + idFaculty + " not found.");
        }
    }

    @Override
    public void deleteFaculty(String idFaculty) {
        if (facultyRepository.existsById(idFaculty)) {
            facultyRepository.deleteById(idFaculty);
        } else {
            throw new RuntimeException("Faculty with ID " + idFaculty + " not found.");
        }
    }
}
