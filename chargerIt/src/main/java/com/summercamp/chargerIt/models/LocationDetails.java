package com.summercamp.chargerIt.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class LocationDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "latitude")
    private double latitude;

    @Column(name = "longitude", nullable = true)
    private double longitude;
}
