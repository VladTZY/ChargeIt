package com.summercamp.chargerIt.models;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import sun.util.resources.LocaleData;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor @Getter @Setter
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

    public Booking(String userName, String carLicense, LocalDateTime startDateTime, int duration) {
        this.userName = userName;
        this.carLicense = carLicense;
        this.startDateTime = startDateTime;
        this.duration = duration;
    }
}
