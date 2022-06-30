package com.summercamp.chargerIt.models;

import lombok.Data;
import sun.util.resources.LocaleData;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "car_license")
    private String carLicense;

    @Column(name = "start_date_time")
    private LocalDate startDateTime;

    @Column(name = "duration")
    private int duration;

    @ManyToOne
    @JoinColumn(name = "station_id", referencedColumnName = "id")
    private Station station;
}
