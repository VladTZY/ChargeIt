package com.summercamp.chargerIt.service;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class DateTimeService {

    public Date getDateFromDateTime(Date dateTime) {
        System.out.println(dateTime.toString());

        return new Date();
    }

    public Date getTimeFromDateTime(Date datetime) {

        return new Date();
    }
}
