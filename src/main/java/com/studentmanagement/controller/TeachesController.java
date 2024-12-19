package com.studentmanagement.controller;

import com.studentmanagement.model.Teaches;
import com.studentmanagement.service.TeachesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teaches")
public class TeachesController {

    private final TeachesService teachesService;

    @Autowired
    public TeachesController(TeachesService teachesService) {
        this.teachesService = teachesService;
    }

    @GetMapping
    public ResponseEntity<List<Teaches>> getAllTeaches() {
        return ResponseEntity.ok(teachesService.getAllTeaches());
    }

    @PostMapping
    public ResponseEntity<Teaches> createTeaches(@RequestBody Teaches teaches) {
        return ResponseEntity.ok(teachesService.saveTeaches(teaches));
    }

    @DeleteMapping("/{idTeacher}/{idSection}")
    public ResponseEntity<Void> deleteTeaches(@PathVariable Integer idTeacher, @PathVariable String idSection) {
        teachesService.deleteTeaches(idTeacher, idSection);
        return ResponseEntity.noContent().build();
    }
}
