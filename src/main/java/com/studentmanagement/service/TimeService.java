package com.studentmanagement.service;

import com.studentmanagement.model.Teacher;
import com.studentmanagement.model.Time;
import java.util.List;
import java.util.Optional;

public interface TimeService {
    List<Time> getAllTimes();

    Optional<Time> getTimeById(Integer idTime);

    List<Time> searchTimes(String type, String query);

    Time createTime(Time time);

    Time updateTime(Integer idTime, Time updatedTime);

    void deleteTime(Integer idTime);
}