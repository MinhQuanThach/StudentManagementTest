package com.studentmanagement.service;

import com.studentmanagement.model.Section;
import com.studentmanagement.model.Time;
import com.studentmanagement.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SectionServiceImpl implements SectionService {
    private final SectionRepository sectionRepository;

    @Autowired
    public SectionServiceImpl(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    @Override
    public List<Section> getAllSections() {
        return sectionRepository.findAll();
    }

    @Override
    public List<Section> searchSections(String type, String query) {
        switch (type.toLowerCase()) {
            case "section":
                return sectionRepository.findSectionsBySectionIdContaining(query);
            case "course":
                return sectionRepository.findSectionsByCourseContaining(query);
            case "semester":
                return sectionRepository.findSectionsBySemesterContaining(query);
            case "year":
                return sectionRepository.findSectionsByYearContaining(query);
            default:
                throw new IllegalArgumentException("Invalid search type:ooo " + type);
        }
    }

    @Override
    public Optional<Section> getSectionById(String idSection) {
        return sectionRepository.findById(idSection);
    }

    @Override
    public Section createSection(Section section) {
        return sectionRepository.save(section);
    }

    @Override
    public Section updateSection(String idSection, Section updatedSection) {
        if (sectionRepository.existsById(idSection)) {
            updatedSection.setIdSection(idSection);
            return sectionRepository.save(updatedSection);
        }
        throw new RuntimeException("Section not found with id: " + idSection);
    }

    @Override
    public void deleteSection(String idSection) {
        if (sectionRepository.existsById(idSection)) {
            sectionRepository.deleteById(idSection);
        } else {
            throw new RuntimeException("Section not found with id: " + idSection);
        }
    }

    @Override
    public Section getLatestSemester() {
        return sectionRepository.findLatestSemester().get(0);
    }
}
