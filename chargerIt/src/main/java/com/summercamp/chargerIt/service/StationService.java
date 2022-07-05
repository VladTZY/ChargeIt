package com.summercamp.chargerIt.service;

import com.summercamp.chargerIt.dto.StationDto;
import com.summercamp.chargerIt.exception.NotFoundException;
import com.summercamp.chargerIt.models.LocationDetails;
import com.summercamp.chargerIt.models.Station;
import com.summercamp.chargerIt.models.StationType;
import com.summercamp.chargerIt.repo.LocationDetailsRepo;
import com.summercamp.chargerIt.repo.StationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class StationService {

    @Autowired
    private StationRepo stationRepo;

    @Autowired
    private LocationDetailsService locationDetailsService;

    @Autowired
    private StationTypeService stationTypeService;

    public List<Station> getStations() {
        return stationRepo.findAll();
    }

    public Station getStationById(Long id) { return stationRepo.findById(id).orElseThrow(() -> { return new NotFoundException("Id not found"); }); }

    public String getLocationUrl(Long id) {
        Station station = getStationById(id);

        return "https://www.google.com/maps/search/?api=1&query=" + station.getLocationDetails().getLatitude() + "%2C" + station.getLocationDetails().getLongitude();
    }


    public Station getStationFromDto(StationDto stationDto) {
        Station station = new Station(stationDto.getName(), stationDto.getLocation(), stationDto.isOpen());
        StationType stationType = stationTypeService.getStationTypeById(stationDto.getStationTypeId());
        LocationDetails locationDetails = new LocationDetails(
                stationDto.getCountry(),
                stationDto.getCity(),
                stationDto.getLatitude(),
                stationDto.getLongitude()
        );

        locationDetailsService.addLocationDetails(locationDetails);

        station.setStationType(stationType);
        station.setLocationDetails(locationDetails);

        return station;
    }

    public Station addStation(StationDto newStationDto) {
        Station newStation = getStationFromDto(newStationDto);

        return stationRepo.save(newStation);
    }

    public ResponseEntity<String> deleteStation(Long id) {
        Station station = getStationById(id);

        stationRepo.deleteById(id);
        return new ResponseEntity<>("Station deleted", HttpStatus.OK);
    }

    @Transactional
    public Station updateStation(Long id, StationDto updatedStation) {
        Station station = getStationById(id);
        LocationDetails locationDetails = station.getLocationDetails();

        station.setName(updatedStation.getName());
        station.setLocation(updatedStation.getLocation());
        station.setOpen(updatedStation.isOpen());
        locationDetails.setCountry(updatedStation.getCountry());
        locationDetails.setCity(updatedStation.getCity());
        locationDetails.setLatitude(updatedStation.getLatitude());
        locationDetails.setLongitude(updatedStation.getLongitude());

        return station;
    }
}
