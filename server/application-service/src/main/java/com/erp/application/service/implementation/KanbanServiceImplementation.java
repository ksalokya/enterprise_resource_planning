package com.erp.application.service.implementation;

import com.erp.application.exception.ResourceNotFoundException;
import com.erp.application.model.kanban.KanbanModel;
import com.erp.application.payload.request.KanbanRequestPayload;
import com.erp.application.payload.response.KanbanResponsePayload;
import com.erp.application.repository.KanbanRepository;
import com.erp.application.service.KanbanService;
import com.mongodb.client.result.DeleteResult;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.FindAndReplaceOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KanbanServiceImplementation implements KanbanService {

    @Autowired
    private KanbanRepository kanbanRepository;

    @Bean
    public ModelMapper kanbanModelMapper() {
        return new ModelMapper();
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    private KanbanModel updateKanbanData(KanbanModel kanbanModel) {
        Query query = new Query()
                .addCriteria(Criteria.where("email").is(kanbanModel.getEmail()))
                .addCriteria(Criteria.where("kanbanData.taskId").is(kanbanModel.getKanbanData().getTaskId()));
        FindAndReplaceOptions findAndReplaceOptions = new FindAndReplaceOptions().returnNew();
        return mongoTemplate.findAndReplace(query, kanbanModel, findAndReplaceOptions, KanbanModel.class, "kanban", KanbanModel.class);
    }

    private void deleteKanbanModel(String email, String taskId) {
        Query query = new Query()
                .addCriteria(Criteria.where("email").is(email))
                .addCriteria(Criteria.where("kanbanData.taskId").is(taskId));
        DeleteResult deleteResult = mongoTemplate.remove(query, "kanban");
    }

    @Override
    public List<KanbanResponsePayload> getKanbans(String user_email) {
        List<KanbanModel> kanbanModelList = kanbanRepository.findAllByEmail(user_email)
                .orElseThrow(() -> new ResourceNotFoundException("Sheet", "User", user_email));

        List<KanbanResponsePayload> kanbanResponsePayloadList = new ArrayList<>();
        for (KanbanModel kanbanModel : kanbanModelList) {
            kanbanResponsePayloadList.add(mapToDto(kanbanModel));
        }
        return kanbanResponsePayloadList;
    }

    @Override
    public void insertKanban(String email, KanbanRequestPayload kanbanRequestPayload) {
        KanbanModel kanbanModel = KanbanModel.builder()
                .email(email)
                .kanbanData(kanbanRequestPayload.getKanbanData())
                .build();
        kanbanRepository.save(kanbanModel);
    }

    @Override
    public KanbanResponsePayload updateKanban(String email, KanbanRequestPayload kanbanRequestPayload) {
        KanbanModel kanbanModel = KanbanModel.builder()
                .email(email)
                .kanbanData(kanbanRequestPayload.getKanbanData())
                .build();
        KanbanModel updatedKanbanModel = updateKanbanData(kanbanModel);
        return mapToDto(updatedKanbanModel);
    }

    @Override
    public void deleteKanban(String email, KanbanRequestPayload kanbanRequestPayload) {
        deleteKanbanModel(email, kanbanRequestPayload.getKey());
    }

    private KanbanModel mapToEntity(KanbanRequestPayload kanbanRequestPayload) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(kanbanRequestPayload, KanbanModel.class);
    }

    private KanbanResponsePayload mapToDto(KanbanModel kanbanModel) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(kanbanModel.getKanbanData(), KanbanResponsePayload.class);
    }
}
