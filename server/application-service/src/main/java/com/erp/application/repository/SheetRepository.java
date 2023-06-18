package com.erp.application.repository;

import com.erp.application.model.SheetModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface SheetRepository extends MongoRepository<SheetModel, String> {
    @Query("{email:?0}")
    Optional<SheetModel> findByEmail(String email);
}
