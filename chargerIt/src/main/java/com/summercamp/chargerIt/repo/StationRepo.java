package com.summercamp.chargerIt.repo;

import com.summercamp.chargerIt.models.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationRepo extends JpaRepository<Station, Long> {
    Station findByName(String name);
}
