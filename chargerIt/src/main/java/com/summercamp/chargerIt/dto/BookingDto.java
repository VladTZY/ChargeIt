package com.summercamp.chargerIt.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class BookingDto {

    private String userName;
    private String carLicense;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startDateTime;

    private int duration;
    private Long stationId;

    public BookingDto(String userName, String carLicense, LocalDateTime startDateTime, int duration, Long stationId) {
        this.userName = userName;
        this.carLicense = carLicense;
        this.startDateTime = startDateTime;
        this.duration = duration;
        this.stationId = stationId;
    }
}
