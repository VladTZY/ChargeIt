package com.summercamp.chargerIt.controller;

import com.summercamp.chargerIt.models.StationType;
import com.summercamp.chargerIt.repo.StationTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/station_types")
public class StationTypeController {

    @Autowired
    private StationTypeRepo stationTypeRepo;

    @GetMapping
    public List<StationType> getStationTypes() {
        return stationTypeRepo.findAll();
    }

    @PostMapping("/add")
    public StationType addStationType(@RequestBody StationType stationType) {
        return stationTypeRepo.save(stationType);
    }
}
