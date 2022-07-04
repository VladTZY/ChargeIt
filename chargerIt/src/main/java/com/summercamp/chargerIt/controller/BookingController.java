package com.summercamp.chargerIt.controller;

import com.summercamp.chargerIt.dto.BookingDto;
import com.summercamp.chargerIt.models.Booking;
import com.summercamp.chargerIt.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<Booking> getBookings() {
        return bookingService.getBookings();
    }

    @PostMapping("/add")
    public Booking addBooking(@RequestBody BookingDto newBookingDto) {
        return bookingService.addBooking(newBookingDto);
    }
}
