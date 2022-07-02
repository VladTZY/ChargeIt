package com.summercamp.chargerIt.service;

import com.summercamp.chargerIt.models.LocationDetails;
import com.summercamp.chargerIt.repo.LocationDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.stream.Location;

@Service
public class LocationDetailsService {

    @Autowired
    private LocationDetailsRepo locationDetailsRepo;

    public LocationDetails addLocationDetails(LocationDetails newLocationDetails) {
        return locationDetailsRepo.save(newLocationDetails);
    }
}
