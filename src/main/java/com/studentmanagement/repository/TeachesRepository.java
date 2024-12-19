package com.studentmanagement.repository;

import com.studentmanagement.model.Teaches;
import com.studentmanagement.ID.TeachesId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeachesRepository extends JpaRepository<Teaches, TeachesId> {
}
