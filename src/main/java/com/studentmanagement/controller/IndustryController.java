package com.studentmanagement.controller;

import com.studentmanagement.model.Course;
import com.studentmanagement.model.Industry;
import com.studentmanagement.service.IndustryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/industries")
public class IndustryController {
    private final IndustryService industryService;

    @Autowired
    public IndustryController(IndustryService industryService) {
        this.industryService = industryService;
    }

    // Retrieve all industries
    @GetMapping
    public List<Industry> getAllIndustries() {
        return industryService.getAllIndustries();
    }

    // Retrieve a specific industry by ID
    @GetMapping("/{idIndustry}")
    public ResponseEntity<Industry> getIndustryById(@PathVariable String idIndustry) {
        return industryService.getIndustryById(idIndustry)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Industry>> searchIndustryByQuery(
            @RequestParam String filter, @RequestParam String query) {
        List<Industry> industries;

        if (filter == null || query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        switch (filter.toLowerCase()) {
            case "idindustry":
                industries = industryService.searchByIdIndustry(query);
                break;
            case "idfaculty":
                industries = industryService.searchByFacultyId(query);
                break;
            case "year":
                industries = industryService.searchByYearNumber(query);
                break;
            case "title":
                industries = industryService.searchByTitle(query);
                break;
            default:
                return ResponseEntity.badRequest().body(null);
        }

        if (industries.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(industries);
    }

    // Add a new industry
    @PostMapping
    public ResponseEntity<Industry> createIndustry(@RequestBody Industry industry) {
        Industry createdIndustry = industryService.createIndustry(industry);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdIndustry);
    }

    // Update an existing industry
    @PutMapping("/{idIndustry}")
    public ResponseEntity<Industry> updateIndustry(@PathVariable String idIndustry, @RequestBody Industry updatedIndustry) {
        Optional<Industry> existingIndustry = industryService.getIndustryById(idIndustry);
        if (existingIndustry.isPresent()) {
            updatedIndustry.setIdIndustry(idIndustry);
            Industry savedIndustry = industryService.updateIndustry(idIndustry, updatedIndustry);
            return ResponseEntity.ok(savedIndustry);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete an industry by ID
    @DeleteMapping("/{idIndustry}")
    public ResponseEntity<Void> deleteIndustry(@PathVariable String idIndustry) {
        if (industryService.getIndustryById(idIndustry).isPresent()) {
            industryService.deleteIndustry(idIndustry);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

