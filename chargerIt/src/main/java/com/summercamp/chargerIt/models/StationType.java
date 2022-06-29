package com.summercamp.chargerIt.models;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import javax.persistence.*;

@Entity
@Data
public class StationType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "power")
    private int power;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "plug_type")
    private String plugType;
}
