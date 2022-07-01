package com.summercamp.chargerIt.service;

import com.summercamp.chargerIt.exception.NotFoundException;
import com.summercamp.chargerIt.models.StationType;
import com.summercamp.chargerIt.repo.StationTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationTypeService {

    @Autowired
    private StationTypeRepo stationTypeRepo;

    public List<StationType> getStationTypes() {
        return stationTypeRepo.findAll();
    }
    public StationType addStationType(StationType newStationType) {
        return stationTypeRepo.save(newStationType);
    }

    public StationType getStationTypeById(Long id) { return stationTypeRepo.findById(id).orElseThrow(() -> {return new NotFoundException("Id not found");});}
}
