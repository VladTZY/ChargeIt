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

    //@Column(name = "start_date_time")
    //@Temporal(TemporalType.TIMESTAMP)
    //private Date startDateTime;

    @Column(name = "start_date")
    @Temporal(TemporalType.DATE)
    Date startDate;

    @Column(name="start_time")
    @Temporal(TemporalType.TIME)
    Date startTime;
    @Column(name = "duration")
    private int duration;

    @ManyToOne
    @JoinColumn(name = "station_id", referencedColumnName = "id")
    private Station station;

    public Booking(String userName, String carLicense, Date startDate, Date startTime, int duration) {
        this.userName = userName;
        this.carLicense = carLicense;
        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
    }
}
