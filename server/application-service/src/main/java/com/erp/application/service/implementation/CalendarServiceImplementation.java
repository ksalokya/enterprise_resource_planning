package com.erp.application.service.implementation;

import com.erp.application.exception.ResourceNotFoundException;
import com.erp.application.model.CalendarData;
import com.erp.application.model.CalendarModel;
import com.erp.application.payload.request.CalendarRequestPayload;
import com.erp.application.payload.response.CalendarResponsePayload;
import com.erp.application.repository.CalendarRepository;
import com.erp.application.service.CalendarService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
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

    @Override
    public CalendarResponsePayload modifySchedules(CalendarRequestPayload calendarRequestPayload) {
        logger.info("modifySchedules method invoked with payload : " + calendarRequestPayload);

        String userEmail = calendarRequestPayload.getEmail();

        // case -> Any schedule is Edited
        if (calendarRequestPayload.getAdded().size() > 0) {
            CalendarModel calendarModel = new CalendarModel();
            calendarModel.setEmail(userEmail);
            calendarModel.setCalendarData(calendarRequestPayload.getAdded().get(0));
            calendarRepository.save(calendarModel);
        }
        // case -> Any schedule is Added
        else if (calendarRequestPayload.getChanged().size() > 0) {

        }
        // case -> one/many schedules are Deleted
        else if (calendarRequestPayload.getDeleted().size() > 0) {

        }

        // TODO ::
        return null;
    }

    private CalendarResponsePayload mapToCalendarResponse(List<CalendarModel> calendarModelList) {
        CalendarResponsePayload calendarResponsePayload = new CalendarResponsePayload();
        calendarResponsePayload.setCalendarDataList(calendarModelList.stream()
                .map(CalendarModel::getCalendarData)
                .collect(Collectors.toList()));
        return calendarResponsePayload;
    }
}
