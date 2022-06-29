package com.summercamp.chargerIt.repo;

import com.summercamp.chargerIt.models.StationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationTypeRepo extends JpaRepository<StationType, Long> {

}
