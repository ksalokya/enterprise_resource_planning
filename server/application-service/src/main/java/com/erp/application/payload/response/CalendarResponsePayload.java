package com.erp.application.payload.response;

import com.erp.application.model.calendar.CalendarData;
import lombok.Data;

import java.util.List;

@Data
public class CalendarResponsePayload {
    List<CalendarData> calendarDataList;
}
