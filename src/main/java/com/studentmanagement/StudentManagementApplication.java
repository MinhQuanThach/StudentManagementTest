package com.studentmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudentManagementApplication {
	public static void main(String[] args) {

		SpringApplication.run(StudentManagementApplication.class, args);
		System.out.println("Running on Java version: " + System.getProperty("java.version"));
	}
}
