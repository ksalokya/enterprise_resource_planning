package com.applications.Applications.repository;

import com.applications.Applications.model.SheetModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SheetRepository extends MongoRepository<SheetModel, String> {
    Optional<SheetModel> findByEmail(String email);
}
