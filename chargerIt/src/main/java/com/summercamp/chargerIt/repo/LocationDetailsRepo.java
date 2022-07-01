package com.summercamp.chargerIt.repo;

import com.summercamp.chargerIt.models.LocationDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationDetailsRepo extends JpaRepository<LocationDetails, Long> {
}
