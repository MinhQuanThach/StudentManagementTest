package com.studentmanagement.service;

import com.studentmanagement.ID.TakesId;
import com.studentmanagement.model.Takes;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface TakesService {
    List<Takes> getAllTakes();
    Optional<Takes> getTakesById(TakesId idTakes);

    List<Takes> findTakesByStudentId(String idStudent);

    List<Takes> findTakesBySectionId(String idSection);

    List<Takes> findTakesByStatus(String status);

    List<Takes> findTakesByYear(String year);

    List<Takes> findTakesByGrade(String grade);

    Takes createTakes(Takes takes);

    Takes updateTakes(TakesId idTakes, Takes updatedTakes);

    List<Map<String, Object>> getSectionsWithStatus(Integer studentId);

    List<Map<String, Object>> getGradesByStudentId(Integer studentId);

    void deleteTakes(TakesId idTakes);
}