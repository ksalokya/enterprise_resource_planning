package com.applications.Applications.service;

import com.applications.Applications.payload.request.CalendarRequestPayload;
import com.applications.Applications.payload.response.CalendarResponsePayload;

public interface CalendarService {
    CalendarResponsePayload getSchedules(CalendarRequestPayload calendarRequestPayload);
    CalendarResponsePayload modifySchedules(CalendarRequestPayload calendarRequestPayload);
}
