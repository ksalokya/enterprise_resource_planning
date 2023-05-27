package com.erp.application.model.calendar;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "calendar")
public class CalendarModel {
    private String email;
    private CalendarData calendarData;
}