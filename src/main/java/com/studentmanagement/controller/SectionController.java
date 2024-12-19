package com.studentmanagement.controller;

import com.studentmanagement.model.Section;
import com.studentmanagement.repository.TakesRepository;
import com.studentmanagement.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sections")
public class SectionController {
    private final SectionService sectionService;
    private final TakesRepository takesRepository;

    @Autowired
    public SectionController(SectionService sectionService, TakesRepository takesRepository) {
        this.sectionService = sectionService;
        this.takesRepository = takesRepository;
    }

    @GetMapping()
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }

    @GetMapping("/{idSection}")
    public ResponseEntity<Section> getSectionById(@PathVariable String idSection) {
        return sectionService.getSectionById(idSection)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Section> createSection(@RequestBody Section section) {
        Section createdSection = sectionService.createSection(section);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSection);
    }

    @PutMapping("/{idSection}")
    public ResponseEntity<Section> updateSection(@PathVariable String idSection, @RequestBody Section updatedSection) {
        try {
            updatedSection.setIdSection(idSection);
            Section savedSection = sectionService.updateSection(idSection, updatedSection);
            return ResponseEntity.ok(savedSection);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{idSection}")
    public ResponseEntity<Void> deleteSection(@PathVariable String idSection) {
        try {
            sectionService.deleteSection(idSection);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Section>> searchSections(
            @RequestParam("type") String type,
            @RequestParam("query") String query) {
        try {
            List<Section> sections = sectionService.searchSections(type, query);
            return ResponseEntity.ok(sections);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Return 400 if the search type is invalid
        }
    }

    @GetMapping("/latest-semester")
    public Section getLatestSemester() {
        return sectionService.getLatestSemester();
    }
}
