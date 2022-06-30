package com.summercamp.chargerIt.service;

import com.summercamp.chargerIt.models.Booking;
import com.summercamp.chargerIt.repo.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    public List<Booking> getBookings() {
        return bookingRepo.findAll();
    }

    public Booking addBooking(Booking newBooking) {
        return bookingRepo.save(newBooking);
    }
}
