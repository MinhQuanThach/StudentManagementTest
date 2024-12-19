package com.studentmanagement.service;

import com.studentmanagement.ID.TeachesId;
import com.studentmanagement.model.Teaches;
import com.studentmanagement.repository.TeachesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeachesServiceImpl implements TeachesService {

    private final TeachesRepository teachesRepository;

    @Autowired
    public TeachesServiceImpl(TeachesRepository teachesRepository) {
        this.teachesRepository = teachesRepository;
    }

    @Override
    public Teaches saveTeaches(Teaches teaches) {
        return teachesRepository.save(teaches);
    }

    @Override
    public void deleteTeaches(Integer idTeacher, String idSection) {
        TeachesId teachesId = new TeachesId(idTeacher, idSection);
        teachesRepository.deleteById(teachesId);
    }

    @Override
    public List<Teaches> getAllTeaches() {
        return teachesRepository.findAll();
    }
}
