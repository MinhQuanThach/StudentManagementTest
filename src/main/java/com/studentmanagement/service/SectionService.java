package com.studentmanagement.service;

import com.studentmanagement.model.Section;
import com.studentmanagement.model.Time;

import java.util.List;
import java.util.Optional;

public interface SectionService {

    List<Section> getAllSections();

    List<Section> searchSections(String type, String query);

    Optional<Section> getSectionById(String idSection);

    Section createSection(Section section);

    Section updateSection(String idSection, Section updatedSection);

    void deleteSection(String idSection);

    Section getLatestSemester();
}
