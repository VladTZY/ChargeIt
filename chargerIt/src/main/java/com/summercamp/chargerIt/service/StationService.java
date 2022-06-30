package com.summercamp.chargerIt.service;

import com.summercamp.chargerIt.models.Station;
import com.summercamp.chargerIt.repo.StationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StationService {

    @Autowired
    private StationRepo stationRepo;

    public List<Station> getStations() {
        return stationRepo.findAll();
    }

    public Station getStation(Long id) { return stationRepo.findById(id).orElseThrow(() -> { return new RuntimeException("Id not found"); }); }

    public String getLocationUrl(Long id) {
        Optional<Station> station = stationRepo.findById(id);

        if (!station.isPresent())
            throw new RuntimeException("Id not found");

        return "https://www.google.com/maps/search/?api=1&query=" + station.get().getLatitude() + "%2C" + station.get().getLongitude();
    }
    public Station addStation(Station newStation) {
        return stationRepo.save(newStation);
    }
}
