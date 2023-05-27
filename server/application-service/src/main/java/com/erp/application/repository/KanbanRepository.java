package com.erp.application.repository;

import com.erp.application.model.KanbanModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface KanbanRepository extends MongoRepository <KanbanModel, String> {
    @Query("{email:?0}")
    Optional<List<KanbanModel>> findAllByEmail(String email);
}
