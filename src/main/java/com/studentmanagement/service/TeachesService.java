package com.studentmanagement.service;

import com.studentmanagement.model.Teaches;

import java.util.List;

public interface TeachesService {
    Teaches saveTeaches(Teaches teaches);

    void deleteTeaches(Integer idTeacher, String idSection);

    List<Teaches> getAllTeaches();
}
