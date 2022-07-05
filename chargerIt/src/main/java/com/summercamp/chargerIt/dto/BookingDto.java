package com.summercamp.chargerIt.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.util.Date;

@Data
public class BookingDto {

    private String userName;
    private String carLicense;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    @JsonFormat(pattern = "HH:mm")
    private Date startTime;

    private int duration;
    private Long stationId;

}
