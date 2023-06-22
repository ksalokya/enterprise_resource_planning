package com.erp.application;

import com.erp.application.model.calendar.CalendarData;
import com.erp.application.payload.request.CalendarRequestPayload;
import com.erp.application.repository.CalendarRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import java.util.Collections;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Testcontainers
@AutoConfigureMockMvc
class ApplicationTests {

    @Container
    static MongoDBContainer mongoDBContainer = new MongoDBContainer(DockerImageName.parse("mongo:4.4.2"));

    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry dynamicPropertyRegistry) {
        dynamicPropertyRegistry.add("spring.data.mongodb.uri", mongoDBContainer::getReplicaSetUrl);
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CalendarRepository calendarRepository;

    @Test
    void shouldGetCalendarData() throws Exception {
        CalendarRequestPayload calendarRequestPayload = getCalendarRequest();
        // convert POJO to JSON
        String calendarRequestPayloadString = objectMapper.writeValueAsString(calendarRequestPayload);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/application/calendar/get")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(calendarRequestPayloadString))
                .andExpect(status().isOk());
    }

    @Test
    void shouldCreateCalendarData() throws Exception {
        CalendarRequestPayload calendarRequestPayload = getCalendarRequest();
        String calendarRequestPayloadString = objectMapper.writeValueAsString(calendarRequestPayload);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/application/calendar/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(calendarRequestPayloadString))
                .andExpect(status().isCreated());
        Assertions.assertEquals(1, calendarRepository.findAll().size());
    }

    private CalendarRequestPayload getCalendarRequest() {
        CalendarData calendarData = new CalendarData();
        calendarData.setScheduleId(1);
        calendarData.setSubject("Party");
        calendarData.setStartTime("2021-01-03T18:30:00.000Z");
        calendarData.setEndTime("2021-01-04T18:30:00.000Z");
        calendarData.setIsAllDay("true");

        CalendarRequestPayload calendarRequestPayload = new CalendarRequestPayload();
        calendarRequestPayload.setAdded(Collections.singletonList(calendarData));
        calendarRequestPayload.setEmail("user@user.com");
        return calendarRequestPayload;
    }
}
