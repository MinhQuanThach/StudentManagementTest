package com.studentmanagement.controller;

import com.studentmanagement.model.Course;
import com.studentmanagement.model.Faculty;
import com.studentmanagement.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/faculties")
public class FacultyController {
    private final FacultyService facultyService;

    @Autowired
    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    // Retrieve all faculties
    @GetMapping
    public List<Faculty> getAllFaculties() {
        return facultyService.getAllFaculties();
    }

    // Retrieve a specific faculty by ID
    @GetMapping("/{idFaculty}")
    public ResponseEntity<Faculty> getFacultyById(@PathVariable String idFaculty) {
        return facultyService.getFacultyById(idFaculty)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Faculty>> searchCourseByQuery(
            @RequestParam String filter, @RequestParam String query) {
        List<Faculty> faculty;

        if (filter == null || query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        switch (filter.toLowerCase()) {
            case "idfaculty":
                faculty = facultyService.searchByIdFaculty(query);
                break;
            case "title":
                faculty = facultyService.searchByTitle(query);
                break;
            case "numberteacher":
                faculty = facultyService.searchByNumberTeacher(query);
                break;
            case "numberstudent":
                faculty = facultyService.searchByNumberStudent(query);
                break;
            default:
                return ResponseEntity.badRequest().body(null);
        }

        if (faculty.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(faculty);
    }

    // Add a new faculty
    @PostMapping
    public ResponseEntity<Faculty> createFaculty(@RequestBody Faculty faculty) {
        Faculty createdFaculty = facultyService.createFaculty(faculty);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFaculty);
    }

    // Update an existing faculty
    @PutMapping("/{idFaculty}")
    public ResponseEntity<Faculty> updateFaculty(@PathVariable String idFaculty, @RequestBody Faculty updatedFaculty) {
        Optional<Faculty> existingFaculty = facultyService.getFacultyById(idFaculty);
        if (existingFaculty.isPresent()) {
            updatedFaculty.setIdFaculty(idFaculty);
            Faculty savedFaculty = facultyService.updateFaculty(idFaculty, updatedFaculty);
            return ResponseEntity.ok(savedFaculty);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a faculty by ID
    @DeleteMapping("/{idFaculty}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable String idFaculty) {
        if (facultyService.getFacultyById(idFaculty).isPresent()) {
            facultyService.deleteFaculty(idFaculty);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

