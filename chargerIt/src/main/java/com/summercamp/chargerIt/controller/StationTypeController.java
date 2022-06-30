package com.summercamp.chargerIt.controller;

import com.summercamp.chargerIt.models.StationType;
import com.summercamp.chargerIt.repo.StationTypeRepo;
import com.summercamp.chargerIt.service.StationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/station_types")
public class StationTypeController {

    @Autowired
    private StationTypeService stationTypeService;

    @GetMapping
    public List<StationType> getStationTypes() {
        return stationTypeService.getStationTypes();
    }

    @PostMapping("/add")
    public StationType addStationType(@RequestBody StationType  newStationType) {
        return stationTypeService.addStationType(newStationType);
    }
}
