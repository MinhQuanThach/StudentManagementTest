package com.studentmanagement.service;

import com.studentmanagement.model.Course;
import com.studentmanagement.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Optional<Course> getCourseById(String idCourse) {
        return courseRepository.findById(idCourse);
    }

    @Override
    public List<Course> searchByIdCourse(String idCourse) {
        return courseRepository.findByIdCourseContaining(idCourse);
    }

    @Override
    public List<Course> searchByCredits(String credits) {
        return courseRepository.findByCredits(credits);
    }

    @Override
    public List<Course> searchByTitle(String title) {
        return courseRepository.findByTitleContaining(title);
    }
    @Override
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(String idCourse, Course updatedCourse) {
        if (courseRepository.existsById(idCourse)) {
            updatedCourse.setIdCourse(idCourse);
            return courseRepository.save(updatedCourse);
        } else {
            throw new RuntimeException("Course with ID " + idCourse + " not found.");
        }
    }

    @Override
    public void deleteCourse(String idCourse) {
        if (courseRepository.existsById(idCourse)) {
            courseRepository.deleteById(idCourse);
        } else {
            throw new RuntimeException("Course with ID " + idCourse + " not found.");
        }
    }
}