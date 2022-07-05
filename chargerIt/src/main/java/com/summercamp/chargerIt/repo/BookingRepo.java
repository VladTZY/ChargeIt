package com.summercamp.chargerIt.repo;

import com.summercamp.chargerIt.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findAllBookingByStartDate(Date date);
}
