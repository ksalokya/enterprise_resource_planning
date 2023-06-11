package com.erp.application.service.implementation;

import com.erp.application.exception.ResourceNotFoundException;
import com.erp.application.model.SheetModel;
import com.erp.application.payload.request.SheetRequestPayload;
import com.erp.application.payload.response.SheetResponsePayload;
import com.erp.application.repository.SheetRepository;
import com.erp.application.service.SheetService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class SheetServiceImplementation implements SheetService {
    @Autowired
    private SheetRepository sheetRepository;

    @Bean
    public ModelMapper sheetModelMapper() {
        return new ModelMapper();
    }

    Logger logger = LoggerFactory.getLogger(SheetServiceImplementation.class);

    @Autowired
    private MongoTemplate mongoTemplate;

    private SheetModel updateSheetData(SheetModel sheetModel) {
        logger.info("updateEditorData method invoked with payload : " + sheetModel);
        Query query = new Query()
                .addCriteria(Criteria.where("email").is(sheetModel.getEmail()));

        Update update = new Update();
        update.setOnInsert("jsonData", sheetModel.getJsonData());

        FindAndModifyOptions options = new FindAndModifyOptions();
        options.upsert(true);
        options.returnNew(true);

        return mongoTemplate.findAndModify(query, update, options, SheetModel.class);
    }

    @Override
    public SheetResponsePayload getSheet(SheetRequestPayload sheetRequestPayload) {
        logger.info("getSheet method invoked with email : " + sheetRequestPayload);

        SheetModel sheetModel = sheetRepository.findByEmail(sheetRequestPayload.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Sheet", "User", sheetRequestPayload.getEmail()));

        return mapToDto(sheetModel);
    }

    @Override
    public SheetModel updateSheet(SheetRequestPayload sheetRequestPayload) {
        logger.info("updateSheet method invoked with sheetPayload : " + sheetRequestPayload);
        SheetModel sheetModel = mapToEntity(sheetRequestPayload);
        return updateSheetData(sheetModel);
    }

    private SheetModel mapToEntity(SheetRequestPayload sheetRequestPayload) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(sheetRequestPayload, SheetModel.class);
    }

    private SheetResponsePayload mapToDto(SheetModel sheetModel) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(sheetModel, SheetResponsePayload.class);
    }
}
