package com.summercamp.chargerIt.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookingDto {

    private String userName;
    private String carLicense;

    @JsonFormat(pattern = "yyyy-MM-dd:HH:mm")
    private LocalDateTime startDateTime;

    private int duration;
    private Long stationId;

}
