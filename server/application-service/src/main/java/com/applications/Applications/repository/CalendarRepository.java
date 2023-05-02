package com.applications.Applications.repository;

import com.applications.Applications.model.CalendarModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CalendarRepository extends MongoRepository<CalendarModel, String> {
    Optional<List<CalendarModel>> findAllByEmail(String email);
}
