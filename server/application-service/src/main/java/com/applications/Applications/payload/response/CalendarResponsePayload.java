package com.applications.Applications.payload.response;

import com.applications.Applications.model.CalendarData;
import lombok.Data;

import java.util.List;

@Data
public class CalendarResponsePayload {
    List<CalendarData> calendarDataList;
}
