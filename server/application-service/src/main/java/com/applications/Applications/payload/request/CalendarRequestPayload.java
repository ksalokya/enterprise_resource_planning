package com.applications.Applications.payload.request;

import com.applications.Applications.model.CalendarData;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

class Params{
    private String StartDate;
    private String EndDate;
}
@Data
public class CalendarRequestPayload {
    @JsonProperty("Email")
    private String email;
    List<CalendarData> changed;
    List<CalendarData> added;
    List<CalendarData> deleted;
    private String action;
    private Params params;
    @JsonProperty("StartDate")
    private String startDate;
    @JsonProperty("EndDate")
    private String endDate;
}
