package com.studentmanagement.controller;

import com.studentmanagement.ID.TakesId;
import com.studentmanagement.model.Student;
import com.studentmanagement.model.Takes;
import com.studentmanagement.service.TakesService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/takes")
public class TakesController {
    private final TakesService takesService;

    @Autowired
    public TakesController(TakesService takesService) {
        this.takesService = takesService;
    }

    @GetMapping
    public List<Takes> getAllTakes() {
        return takesService.getAllTakes();
    }

    @GetMapping("/{studentId}/{sectionId}")
    public ResponseEntity<Takes> getTakesById(@PathVariable Integer studentId, @PathVariable String sectionId) {
        TakesId takesId = new TakesId(studentId, sectionId);
        return takesService.getTakesById(takesId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Takes>> searchTakesByQuery(
            @RequestParam String filter, @RequestParam String query) {
        List<Takes> takes;

        if (filter == null || query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        switch (filter.toLowerCase()) {
            case "idstudent":
                takes = takesService.findTakesByStudentId(query);
                break;
            case "idcourse":
                takes = takesService.findTakesBySectionId(query);
                break;
            case "status":
                takes = takesService.findTakesByStatus(query);
                break;
            case "year":
                takes = takesService.findTakesByYear(query);
                break;
            case "grade":
                takes = takesService.findTakesByGrade(query);
                break;
            default:
                return ResponseEntity.badRequest().body(null);
        }

        if (takes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(takes);
    }

    @PostMapping
    public ResponseEntity<Takes> createTakes(@RequestBody Takes takes) {
        Takes createdTakes = takesService.createTakes(takes);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTakes);
    }

    @PutMapping("/{studentId}/{sectionId}")
    public ResponseEntity<Takes> updateTakes(
            @PathVariable Integer studentId,
            @PathVariable String sectionId,
            @RequestBody Takes updatedTakes) {
        TakesId takesId = new TakesId(studentId, sectionId);
        try {
            Takes updatedTake = takesService.updateTakes(takesId, updatedTakes);
            return ResponseEntity.ok(updatedTake);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/student-sections")
    public ResponseEntity<List<Map<String, Object>>> getStudentSections(@RequestParam("studentID") Integer studentId) {
        List<Map<String, Object>> sections = takesService.getSectionsWithStatus(studentId);
        return ResponseEntity.ok(sections);
    }

    @GetMapping("/grades/{studentId}")
    public List<Map<String, Object>> getGrades(@PathVariable int studentId) {
        return takesService.getGradesByStudentId(studentId);
    }

    @DeleteMapping("/{studentId}/{sectionId}")
    public ResponseEntity<Void> deleteTakes(@PathVariable Integer studentId, @PathVariable String sectionId) {
        TakesId takesId = new TakesId(studentId, sectionId);
        takesService.deleteTakes(takesId);
        return ResponseEntity.noContent().build();
    }
}