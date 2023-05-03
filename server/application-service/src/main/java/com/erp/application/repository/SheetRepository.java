package com.erp.application.repository;

import com.erp.application.model.SheetModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SheetRepository extends MongoRepository<SheetModel, String> {
    Optional<SheetModel> findByEmail(String email);
}
