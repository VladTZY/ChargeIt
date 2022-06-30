package com.summercamp.chargerIt.models;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "location")
    private String location;

    @Column(name = "latitude")
    private double latitude;

    @Column(name = "longitude", nullable = true)
    private double longitude;

    @Column(name = "is_open", nullable = true)
    private boolean isOpen;

    @OneToOne
    @JoinColumn(name = "station_type_id", referencedColumnName = "id")
    private StationType stationType;

    @OneToMany(mappedBy = "station")
    @JsonIgnoreProperties("station")
    private List<Booking> bookings;
}
