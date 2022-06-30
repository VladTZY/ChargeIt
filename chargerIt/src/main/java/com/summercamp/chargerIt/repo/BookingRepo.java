package com.summercamp.chargerIt.repo;

import com.summercamp.chargerIt.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
}
