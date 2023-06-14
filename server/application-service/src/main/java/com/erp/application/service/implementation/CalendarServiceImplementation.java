package com.erp.application.service.implementation;

import com.erp.application.exception.ResourceNotFoundException;
import com.erp.application.model.calendar.CalendarModel;
import com.erp.application.payload.request.CalendarRequestPayload;
import com.erp.application.payload.response.CalendarResponsePayload;
import com.erp.application.repository.CalendarRepository;
import com.erp.application.service.CalendarService;
import com.mongodb.client.result.DeleteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndReplaceOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CalendarServiceImplementation implements CalendarService {
    @Autowired
    private CalendarRepository calendarRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    private CalendarModel updateScheduleData(CalendarModel calendarModel) {
        Query query = new Query()
                .addCriteria(Criteria.where("email").is(calendarModel.getEmail()))
                .addCriteria(Criteria.where("calendarData.scheduleId").is(calendarModel.getCalendarData().getScheduleId()));
        FindAndReplaceOptions findAndReplaceOptions = new FindAndReplaceOptions().returnNew();
        return mongoTemplate.findAndReplace(query, calendarModel, findAndReplaceOptions, CalendarModel.class, "calendar", CalendarModel.class);
    }

    private void deleteCalendarModel(CalendarModel calendarModel) {
        Query query = new Query()
                .addCriteria(Criteria.where("email").is(calendarModel.getEmail()))
                .addCriteria(Criteria.where("calendarData.scheduleId").is(calendarModel.getCalendarData().getScheduleId()));
        DeleteResult deleteResult = mongoTemplate.remove(query, "calendar");
    }

    private void deleteManyCalendarModels(List<CalendarModel> calendarModelList) {
        String userEmail = calendarModelList.get(0).getEmail();
        List<Long> ids = calendarModelList.stream()
                .map(calendarModel -> calendarModel.getCalendarData().getScheduleId())
                .toList();
        Query query = new Query()
                .addCriteria(Criteria.where("email").is(userEmail))
                .addCriteria(Criteria.where("calendarData.scheduleId").in(ids));
        DeleteResult deleteResult = mongoTemplate.remove(query, "calendar");
    }

    @Override
    public CalendarResponsePayload getSchedules(CalendarRequestPayload calendarRequestPayload) {
        List<CalendarModel> calendarModelList = calendarRepository.findAllByEmail(calendarRequestPayload.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Sheet", "User", calendarRequestPayload.getEmail()));
        return mapToCalendarResponse(calendarModelList);
    }

    @Override
    public void modifySchedules(CalendarRequestPayload calendarRequestPayload) {
        if (calendarRequestPayload.getAdded().size() > 0) {
            CalendarModel calendarModel = mapToCalendarModel(calendarRequestPayload, "added");
            calendarRepository.save(calendarModel);
        } else if (calendarRequestPayload.getChanged().size() > 0) {
            CalendarModel calendarModel = mapToCalendarModel(calendarRequestPayload, "updated");
            CalendarModel updatedCalendarData = updateScheduleData(calendarModel);
        } else {
            long size = calendarRequestPayload.getDeleted().size();
            if (size == 1) {
                CalendarModel calendarModel = mapToCalendarModel(calendarRequestPayload, "deleted");
                deleteCalendarModel(calendarModel);
            } else {
                String userEmail = calendarRequestPayload.getEmail();
                List<CalendarModel> calendarModelList = calendarRequestPayload.getDeleted()
                        .stream()
                        .map(calendarData -> new CalendarModel(userEmail, calendarData))
                        .toList();
                deleteManyCalendarModels(calendarModelList);
            }
        }
    }

    private CalendarResponsePayload mapToCalendarResponse(List<CalendarModel> calendarModelList) {
        CalendarResponsePayload calendarResponsePayload = new CalendarResponsePayload();
        calendarResponsePayload.setCalendarDataList(calendarModelList.stream()
                .map(CalendarModel::getCalendarData)
                .collect(Collectors.toList()));
        return calendarResponsePayload;
    }

    private CalendarModel mapToCalendarModel(CalendarRequestPayload calendarRequestPayload, String operation) {
        CalendarModel calendarModel = new CalendarModel();
        calendarModel.setEmail(calendarRequestPayload.getEmail());
        switch (operation) {
            case "added" -> calendarModel.setCalendarData(calendarRequestPayload.getAdded().get(0));
            case "updated" -> calendarModel.setCalendarData(calendarRequestPayload.getChanged().get(0));
            case "deleted" -> calendarModel.setCalendarData(calendarRequestPayload.getDeleted().get(0));
        }
        return calendarModel;
    }
}
