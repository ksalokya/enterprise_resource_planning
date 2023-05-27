package com.erp.application.service.implementation;

import com.erp.application.exception.ResourceNotFoundException;
import com.erp.application.model.EditorModel;
import com.erp.application.payload.request.EditorRequestPayload;
import com.erp.application.payload.response.EditorResponsePayload;
import com.erp.application.repository.EditorRepository;
import com.erp.application.service.EditorService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class EditorServiceImplementation implements EditorService {
    Logger logger = LoggerFactory.getLogger(EditorServiceImplementation.class);

    @Autowired
    private EditorRepository editorRepository;

    @Bean
    public ModelMapper editorModelMapper() {
        return new ModelMapper();
    }

    @Override
    public EditorResponsePayload getEditor(String userName) {
        logger.info("getEditor method invoked with email :: " + userName);
        EditorModel editorModel = editorRepository.findByEmail(userName)
                .orElseThrow(() -> new ResourceNotFoundException("Editor", "User", userName));
        return mapToDto(editorModel);
    }

    @Override
    public EditorResponsePayload updateEditor(EditorRequestPayload editorRequestPayload) {
        logger.info("updateEditor method invoked with payload :: " + editorRequestPayload);
        EditorModel editorModel = mapToEntity(editorRequestPayload);
        EditorModel response = editorRepository.save(editorModel);
        return mapToDto(response);
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
