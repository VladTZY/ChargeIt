package com.summercamp.chargerIt.service;

import com.summercamp.chargerIt.models.Station;
import com.summercamp.chargerIt.repo.StationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationService {

    @Autowired
    private StationRepo stationRepo;

    public List<Station> getStations() {
        return stationRepo.findAll();
    }

    public Station addStation(Station newStation) {
        return stationRepo.save(newStation);
    }
}
