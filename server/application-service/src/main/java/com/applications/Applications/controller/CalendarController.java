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
    public ResponseEntity<CalendarResponsePayload> getCalendarController(@RequestBody CalendarRequestPayload calendarRequestPayload) {
        logger.info("getCalendarController method invoked with email :: " + calendarRequestPayload);
        CalendarResponsePayload calendarResponsePayload = calendarService.getSchedules(calendarRequestPayload);
        return new ResponseEntity<>(calendarResponsePayload, HttpStatus.FOUND);
    }

//    @CrossOrigin(origins = "http://localhost:3000")
//    @PostMapping("/api/v1/calendar/modify")
//    public ResponseEntity<SheetResponsePayload> saveCalendarController(@RequestBody SheetRequestPayload sheetRequestPayload) {
//        logger.info("saveSheetController method invoked with sheetPayload :: " + sheetRequestPayload);
//        SheetResponsePayload response = sheetService.updateSheet(sheetRequestPayload);
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//    }
}
