package com.erp.application.service.implementation;

import com.erp.application.exception.ResourceNotFoundException;
import com.erp.application.model.EditorModel;
import com.erp.application.payload.request.EditorRequestPayload;
import com.erp.application.payload.response.EditorResponsePayload;
import com.erp.application.repository.EditorRepository;
import com.erp.application.service.EditorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class EditorServiceImplementation implements EditorService {

    @Autowired
    private EditorRepository editorRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Bean
    public ModelMapper editorModelMapper() {
        return new ModelMapper();
    }

    private EditorModel updateEditorData(EditorModel editorModel) {
        Query query = new Query()
                .addCriteria(Criteria.where("email").is(editorModel.getEmail()));

        Update update = new Update();
        update.set("content", editorModel.getContent());

        FindAndModifyOptions options = new FindAndModifyOptions();
        options.upsert(true);
        options.returnNew(true);

        return mongoTemplate.findAndModify(query, update, options, EditorModel.class);
    }

    @Override
    public EditorResponsePayload getEditor(String userName) {
        EditorModel editorModel = editorRepository.findByEmail(userName)
                .orElseThrow(() -> new ResourceNotFoundException("Editor", "User", userName));
        return mapToDto(editorModel);
    }

    @Override
    public EditorModel updateEditor(EditorRequestPayload editorRequestPayload) {
        EditorModel editorModel = mapToEntity(editorRequestPayload);
        return updateEditorData(editorModel);
    }

    private EditorModel mapToEntity(EditorRequestPayload editorRequestPayload) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(editorRequestPayload, EditorModel.class);
    }

    private EditorResponsePayload mapToDto(EditorModel editorModel) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(editorModel, EditorResponsePayload.class);
    }
}
