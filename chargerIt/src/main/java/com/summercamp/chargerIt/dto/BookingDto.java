package com.summercamp.chargerIt.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingDto {

    private String userName;
    private String carLicense;
    private LocalDateTime startDateTime;
    private int duration;
    private Long stationId;
}
