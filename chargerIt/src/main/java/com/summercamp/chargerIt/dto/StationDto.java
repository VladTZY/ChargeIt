package com.summercamp.chargerIt.dto;

import lombok.Data;

@Data
public class StationDto {

    private String name;
    private String location;
    private boolean isOpen;
    private double latitude;
    private double longitude;
    private String country;
    private String city;
    private Long stationTypeId;
}
