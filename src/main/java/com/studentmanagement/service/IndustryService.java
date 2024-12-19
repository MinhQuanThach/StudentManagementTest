package com.studentmanagement.service;

import com.studentmanagement.model.Industry;

import java.util.List;
import java.util.Optional;

public interface IndustryService {
    List<Industry> getAllIndustries();

    Optional<Industry> getIndustryById(String idIndustry);

    List<Industry> searchByIdIndustry(String idIndustry);

    List<Industry> searchByFacultyId(String idFaculty);

    List<Industry> searchByYearNumber(String yearNumber);

    List<Industry> searchByTitle(String title);

    Industry createIndustry(Industry industry);

    Industry updateIndustry(String idIndustry, Industry updatedIndustry);

    void deleteIndustry(String idIndustry);
}
