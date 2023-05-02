package com.applications.Applications.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class CalendarData{
    @JsonProperty("Id")
    private long Id;
    @JsonProperty("Subject")
    private String Subject;
    @JsonProperty("Location")
    private String Location;
    @JsonProperty("StartTime")
    private String StartTime;
    @JsonProperty("EndTime")
    private String EndTime;
    @JsonProperty("CategoryColor")
    private String CategoryColor;
//    @JsonProperty("IsAllDay")
//    private String isAllDay;
//    @JsonProperty("StartTimezone")
//    private String startTimezone;
//    @JsonProperty("EndTimezone")
//    private String endTimezone;
//    @JsonProperty("RecurrenceRule")
//    private String recurrenceRule;
}