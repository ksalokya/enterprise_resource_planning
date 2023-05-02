package com.applications.Applications.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CalendarData{
    @JsonProperty("Subject")
    private String subject;
    @JsonProperty("StartTime")
    private String startTime;
    @JsonProperty("EndTime")
    private String endTime;
    @JsonProperty("IsAllDay")
    private String isAllDay;
    @JsonProperty("StartTimezone")
    private String startTimezone;
    @JsonProperty("EndTimezone")
    private String endTimezone;
    @JsonProperty("RecurrenceRule")
    private String recurrenceRule;
    @JsonProperty("Id")
    private String id;
}