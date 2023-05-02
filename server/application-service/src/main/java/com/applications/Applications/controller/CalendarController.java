package com.applications.Applications.controller;

import com.applications.Applications.payload.request.CalendarRequestPayload;
import com.applications.Applications.payload.response.CalendarResponsePayload;
import com.applications.Applications.service.CalendarService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalendarController {
    Logger logger = LoggerFactory.getLogger(CalendarController.class);

    @Autowired
    private CalendarService calendarService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/v1/calendar/get")
    public ResponseEntity<?> getCalendarController(@RequestBody CalendarRequestPayload calendarRequestPayload) {
        logger.info("getCalendarController method invoked with email :: " + calendarRequestPayload);
        CalendarResponsePayload calendarResponsePayload = calendarService.getSchedules(calendarRequestPayload);
        System.out.println(calendarResponsePayload.getCalendarDataList());
        return new ResponseEntity<>(calendarResponsePayload.getCalendarDataList(), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/v1/calendar/modify")
    public ResponseEntity<?> saveCalendarController(@RequestBody CalendarRequestPayload calendarRequestPayload) {
        logger.info("saveCalendarController method invoked with calendarPayload :: " + calendarRequestPayload);
        CalendarResponsePayload response = calendarService.modifySchedules(calendarRequestPayload);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
