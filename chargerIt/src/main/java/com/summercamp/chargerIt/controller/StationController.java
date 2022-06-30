package com.summercamp.chargerIt.controller;

import com.summercamp.chargerIt.models.Station;
import com.summercamp.chargerIt.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stations")
public class StationController {

    @Autowired
    private StationService stationService;

    @GetMapping
    public List<Station> getStations() {
        return stationService.getStations();
    }

    @PostMapping(value = "/add")
    public Station addStation(@RequestBody Station newStation) {
        return stationService.addStation(newStation);
    }
}
