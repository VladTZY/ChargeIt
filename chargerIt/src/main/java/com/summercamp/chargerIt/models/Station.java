package com.summercamp.chargerIt.models;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor @Getter @Setter
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "location")
    private String location;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_details_id", referencedColumnName = "id")
    private LocationDetails locationDetails;

    @Column(name = "is_open", nullable = true)
    private boolean isOpen;

    @OneToOne
    @JoinColumn(name = "station_type_id", referencedColumnName = "id")
    private StationType stationType;

    public Station(String name, String location, boolean open) {
        this.name = name;
        this.location = location;
        this.isOpen = open;
    }
}
