package com.studentmanagement.controller;

import com.studentmanagement.model.Time;
import com.studentmanagement.service.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/times")
public class TimeController {
    private final TimeService timeService;

    @Autowired
    public TimeController(TimeService timeService) {
        this.timeService = timeService;
    }

    @GetMapping
    public List<Time> getAllTimes() {
        return timeService.getAllTimes();
    }

    @GetMapping("/{idTime}")
    public ResponseEntity<Time> getTimeById(@PathVariable Integer idTime) {
        Optional<Time> time = timeService.getTimeById(idTime);
        return time.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Time>> searchTimes(
            @RequestParam("type") String type,
            @RequestParam("query") String query) {
        try {
            List<Time> times = timeService.searchTimes(type, query);
            return ResponseEntity.ok(times);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Return 400 if the search type is invalid
        }
    }

    @PostMapping
    public ResponseEntity<Time> createTime(@RequestBody Time time) {
        Time createdTime = timeService.createTime(time);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTime);
    }

    @PutMapping("/{idTime}")
    public ResponseEntity<Time> updateTime(@PathVariable Integer idTime, @RequestBody Time updatedTime) {
        try {
            updatedTime.setIdTime(idTime);
            Time savedTime = timeService.updateTime(idTime, updatedTime);
            return ResponseEntity.ok(savedTime);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{idTime}")
    public ResponseEntity<Void> deleteTime(@PathVariable Integer idTime) {
        try {
            timeService.deleteTime(idTime);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}