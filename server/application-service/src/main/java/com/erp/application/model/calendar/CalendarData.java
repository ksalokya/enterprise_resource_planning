package com.erp.application.model.calendar;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class CalendarData{
    @JsonProperty("Id")
    private long scheduleId;
    @JsonProperty("Subject")
    private String subject;
    @JsonProperty("Location")
    private String location;
    @JsonProperty("StartTime")
    private String startTime;
    @JsonProperty("EndTime")
    private String endTime;
    @JsonProperty("CategoryColor")
    private String categoryColor;
    @JsonProperty("IsAllDay")
    private String isAllDay;
    @JsonProperty("StartTimezone")
    private String startTimezone;
    @JsonProperty("EndTimezone")
    private String endTimezone;
    @JsonProperty("RecurrenceRule")
    private String recurrenceRule;
    @JsonProperty("Description")
    private String description;
}