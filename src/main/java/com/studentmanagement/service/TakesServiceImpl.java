package com.studentmanagement.service;

import com.studentmanagement.ID.TakesId;
import com.studentmanagement.model.Takes;
import com.studentmanagement.repository.TakesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TakesServiceImpl implements TakesService {
    private final TakesRepository takesRepository;

    @Autowired
    public TakesServiceImpl(TakesRepository takesRepository) {
        this.takesRepository = takesRepository;
    }

    @Override
    public List<Takes> getAllTakes() {
        return takesRepository.findAll();
    }

    @Override
    public Optional<Takes> getTakesById(TakesId idTakes) {
        return takesRepository.findById(idTakes);
    }

    @Override
    public List<Takes> findTakesByStudentId(String idStudent) {
        return takesRepository.findTakesByStudentIdContaining(idStudent);
    }

    @Override
    public List<Takes> findTakesBySectionId(String idCourse) {
        return takesRepository.findTakesBySectionIdContaining(idCourse);
    }

    @Override
    public List<Takes> findTakesByStatus(String status) {
        return takesRepository.findTakesByStatusContaining(status);
    }

    @Override
    public List<Takes> findTakesByYear(String year) {
        return takesRepository.findTakesByYearContaining(year);
    }

    @Override
    public List<Takes> findTakesByGrade(String grade) {
        return takesRepository.findTakesByGradeContaining(grade);
    }

    @Override
    public Takes createTakes(Takes takes) { return takesRepository.save(takes);}

    @Override
    public Takes updateTakes(TakesId idTakes, Takes updatedTakes) {
        Optional<Takes> existingTakes = takesRepository.findById(idTakes);
        if (existingTakes.isPresent()) {
            Takes takes = existingTakes.get();
            takes.setStatus(updatedTakes.getStatus());
            takes.setYear(updatedTakes.getYear());
            takes.setGrade(updatedTakes.getGrade());
            return takesRepository.save(takes);
        } else {
            throw new RuntimeException("Takes record not found with ID: " + idTakes);
        }
    }

    @Override
    public List<Map<String, Object>> getSectionsWithStatus(Integer studentId) {
        List<Object[]> results = takesRepository.findSectionsWithStatusByStudentId(studentId);

        // Chuyển kết quả Object[] thành Map
        List<Map<String, Object>> sections = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> section = new HashMap<>();
            section.put("id_section", (String) row[0]);
            section.put("semester", (String) row[1]);
            section.put("status", (String) row[2]);
            section.put("title", (String) row[3]);
            section.put("year", (Integer) row[4]);
            sections.add(section);
        }
        return sections;
    }

    @Override
    public List<Map<String, Object>> getGradesByStudentId(Integer studentId) {
        List<Object[]> results = takesRepository.findGradesByStudentId(studentId);
        List<Map<String, Object>> grades = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Object> grade = new HashMap<>();
            grade.put("year", (Integer) row[0]);
            grade.put("section_semester", (String) row[1]); // Kỳ học từ bảng Section
            grade.put("grade", (Double) row[2]);
            grade.put("idCourse", (String) row[3]);
            grade.put("title", (String) row[4]);
            grade.put("credits", (Integer) row[5]);
            grades.add(grade);
        }
        return grades;
    }

    @Override
    public void deleteTakes(TakesId idTakes) {
        takesRepository.deleteById(idTakes);
    }
}