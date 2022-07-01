package com.summercamp.chargerIt.models;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import sun.util.resources.LocaleData;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private LocalDateTime startDateTime;

    @Column(name = "duration")
    private int duration;

    @ManyToOne
    @JoinColumn(name = "station_id", referencedColumnName = "id")
    //@JsonIgnoreProperties("bookings")
    private Station station;
}
