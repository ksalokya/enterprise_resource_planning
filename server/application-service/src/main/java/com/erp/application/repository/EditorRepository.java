package com.erp.application.repository;

import com.erp.application.model.EditorModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface EditorRepository extends MongoRepository <EditorModel, String> {
    @Query("{email:?0}")
    Optional<EditorModel> findByEmail(String email);
}
