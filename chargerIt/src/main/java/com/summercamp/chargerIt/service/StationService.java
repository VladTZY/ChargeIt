package com.summercamp.chargerIt.service;

import com.summercamp.chargerIt.dto.StationDto;
import com.summercamp.chargerIt.exception.NotFoundException;
import com.summercamp.chargerIt.models.LocationDetails;
import com.summercamp.chargerIt.models.Station;
import com.summercamp.chargerIt.models.StationType;
import com.summercamp.chargerIt.repo.LocationDetailsRepo;
import com.summercamp.chargerIt.repo.StationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationService {

    @Autowired
    private StationRepo stationRepo;
    @Autowired
    private LocationDetailsRepo locationDetailsRepo;

    @Autowired
    private StationTypeService stationTypeService;

    public List<Station> getStations() {
        return stationRepo.findAll();
    }

    public Station getStation(Long id) { return stationRepo.findById(id).orElseThrow(() -> { return new NotFoundException("Id not found"); }); }

    public String getLocationUrl(Long id) {
        Station station = getStation(id);

        return "https://www.google.com/maps/search/?api=1&query=" + station.getLocationDetails().getLatitude() + "%2C" + station.getLocationDetails().getLongitude();
    }
    public Station addStation(StationDto newStationDto) {
        Station newStation = new Station();
        StationType newStationType = stationTypeService.getStationTypeById(newStationDto.getStationTypeId());
        LocationDetails newLocationDetails = new LocationDetails();

        newStation.setName(newStationDto.getName());
        newStation.setLocation(newStationDto.getLocation());
        newStation.setOpen(newStationDto.isOpen());
        newStation.setStationType(newStationType);

        newLocationDetails.setCountry(newStationDto.getCountry());
        newLocationDetails.setCity(newStationDto.getCity());
        newLocationDetails.setLatitude(newStationDto.getLatitude());
        newLocationDetails.setLongitude(newStationDto.getLongitude());

        locationDetailsRepo.save(newLocationDetails);
        newStation.setLocationDetails(newLocationDetails);

        return stationRepo.save(newStation);
    }
}
