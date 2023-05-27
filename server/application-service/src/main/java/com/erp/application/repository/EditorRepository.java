package com.erp.application.repository;

import com.erp.application.model.EditorModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface EditorRepository extends MongoRepository <EditorModel, String> {
    Optional<EditorModel> findByEmail(String email);
}
