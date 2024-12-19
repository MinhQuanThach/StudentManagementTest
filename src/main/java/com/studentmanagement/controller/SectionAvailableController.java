package com.studentmanagement.controller;

import com.studentmanagement.DTO.SectionAvailableDTO;
import com.studentmanagement.service.SectionAvailableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/section_available")
public class SectionAvailableController {
    @Autowired
    private SectionAvailableService sectionAvailableService;

    @GetMapping("/{semester}/{year}")
    public ResponseEntity<List<SectionAvailableDTO>> getSectionsBySemesterAndYear(@PathVariable String semester, @PathVariable int year) {
        List<SectionAvailableDTO> availableSections = sectionAvailableService.getSectionsBySemesterAndYear(semester, year);
        if (availableSections.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(availableSections);
    }

    @GetMapping("/search/{semester}/{year}/{idStudent}")
    public ResponseEntity<List<SectionAvailableDTO>> getSectionDetails(@PathVariable String semester,
                                                       @PathVariable int year,
                                                       @PathVariable Integer idStudent) {
        List<SectionAvailableDTO> availableSections = sectionAvailableService.getSectionDetails(semester, year, idStudent);
        if (availableSections.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(availableSections);
    }

    @DeleteMapping("/delete/{semester}/{year}/{idStudent}")
    public ResponseEntity<String> deleteTakes(@PathVariable String semester,
                                              @PathVariable int year,
                                              @PathVariable Integer idStudent) {
        try {
             sectionAvailableService.deleteTakesByStudentAndSemesterAndYear(idStudent, semester, year);
            return ResponseEntity.ok("Deleted successfully.");
        } catch (Exception e) {
            e.printStackTrace(); // Log lỗi chi tiết
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

}
