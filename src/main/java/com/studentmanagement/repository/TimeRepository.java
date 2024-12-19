package com.studentmanagement.repository;

import com.studentmanagement.model.Time;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalTime;
import java.util.List;

public interface TimeRepository extends JpaRepository<Time, Integer> {
    @Query("SELECT t FROM Time t WHERE t.section.idSection LIKE %:sectionId%")
    List<Time> findTimesBySectionIdContaining(@Param("sectionId") String sectionId);

    @Query("SELECT t FROM Time t WHERE t.day LIKE %:day%")
    List<Time> findTimesByDayContaining(@Param("day") String day);

    @Query("SELECT t FROM Time t WHERE CAST(t.startTime AS string) LIKE %:startTime%")
    List<Time> findTimesByStartTimeContaining(@Param("startTime") String startTime);

    @Query("SELECT t FROM Time t WHERE CAST(t.endTime AS string) LIKE %:endTime%")
    List<Time> findTimesByEndTimeContaining(@Param("endTime") String endTime);

    @Query("SELECT t FROM Time t WHERE t.roomNumber LIKE %:roomNumber%")
    List<Time> findTimesByRoomNumberContaining(@Param("roomNumber") String roomNumber);

}