package com.erp.application.service;

import com.erp.application.payload.request.CalendarRequestPayload;
import com.erp.application.payload.response.CalendarResponsePayload;

public interface CalendarService {
    CalendarResponsePayload getSchedules(CalendarRequestPayload calendarRequestPayload);
    CalendarResponsePayload modifySchedules(CalendarRequestPayload calendarRequestPayload);
}
