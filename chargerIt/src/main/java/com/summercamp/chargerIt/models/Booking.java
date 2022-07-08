package com.summercamp.chargerIt.models;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import sun.util.resources.LocaleData;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

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

    @Column(name = "start_date")
    private LocalDateTime startDateTime;

    @Column(name = "end_date")
    private LocalDateTime endDateTime;

    @ManyToOne
    @JoinColumn(name = "station_id", referencedColumnName = "id")
    private Station station;

    public Booking(String userName, String carLicense, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        this.userName = userName;
        this.carLicense = carLicense;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }
}
