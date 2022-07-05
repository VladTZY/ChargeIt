package com.summercamp.chargerIt.controller;

import com.summercamp.chargerIt.dto.StationDto;
import com.summercamp.chargerIt.models.Station;
import com.summercamp.chargerIt.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stations")
@CrossOrigin
public class StationController {

    @Autowired
    private StationService stationService;

    @GetMapping
    public List<Station> getStations() {
        return stationService.getStations();
    }

    @GetMapping("/{id}")
    public Station getStation(@PathVariable Long id) {
        return stationService.getStationById(id);
    }

    @GetMapping("/{id}/location_url")
    public String getStationUrl(@PathVariable Long id) {
        return stationService.getLocationUrl(id);
    }

    @PostMapping(value = "/add")
    public Station addStation(@RequestBody StationDto newStationDto) {
        return stationService.addStation(newStationDto);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deteleStation(@PathVariable Long id) {
        return stationService.deleteStation(id);
    }

    @PutMapping(value = "/update/{id}")
    public Station updateStation(@PathVariable Long id, @RequestBody StationDto updatedStationDto) {
        return stationService.updateStation(id, updatedStationDto);
    }
}