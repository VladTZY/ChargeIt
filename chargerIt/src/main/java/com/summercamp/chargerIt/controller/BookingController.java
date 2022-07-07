package com.summercamp.chargerIt.controller;

import com.summercamp.chargerIt.dto.BookingDto;
import com.summercamp.chargerIt.models.Booking;
import com.summercamp.chargerIt.service.BookingService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<Booking> getBookings() { return bookingService.getBookings(); }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) { return bookingService.getBookingById(id); }

    @GetMapping("/date/{startDateTime}")
    @SneakyThrows
    public List<Booking> getBookingByDate(@PathVariable String startDateTime) { return bookingService.getBookingByDate(startDateTime); }

    @PostMapping("/add")
    public Booking addBooking(@RequestBody BookingDto newBookingDto) {
        return bookingService.addBooking(newBookingDto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        return bookingService.deleteBooking(id);
    }

    @PutMapping("/update/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody BookingDto updatedBookingDto) {
        return bookingService.updateBooking(id, updatedBookingDto);
    }
}
