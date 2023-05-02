package com.applications.Applications.service.implementation;

import com.applications.Applications.exception.ResourceNotFoundException;
import com.applications.Applications.model.CalendarModel;
import com.applications.Applications.payload.request.CalendarRequestPayload;
import com.applications.Applications.payload.response.CalendarResponsePayload;
import com.applications.Applications.repository.CalendarRepository;
import com.applications.Applications.service.CalendarService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CalendarServiceImplementation implements CalendarService {
    @Autowired
    private CalendarRepository calendarRepository;

    Logger logger = LoggerFactory.getLogger(CalendarServiceImplementation.class);

    @Override
    public CalendarResponsePayload getSchedules(CalendarRequestPayload calendarRequestPayload) {
        logger.info("getSchedules method invoked with email : " + calendarRequestPayload);
        List<CalendarModel> calendarModelList = calendarRepository.findAllByEmail(calendarRequestPayload.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Sheet", "User", calendarRequestPayload.getEmail()));
        return mapToCalendarResponse(calendarModelList);
    }

    private CalendarResponsePayload mapToCalendarResponse(List<CalendarModel> calendarModelList) {
        CalendarResponsePayload calendarResponsePayload = new CalendarResponsePayload();
        calendarResponsePayload.setCalendarDataList(calendarModelList.stream()
                .map(CalendarModel::getCalendarData)
                .collect(Collectors.toList()));
        return calendarResponsePayload;
    }
}
