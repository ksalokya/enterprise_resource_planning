package com.applications.Applications.service.implementation;

import com.applications.Applications.exception.ResourceNotFoundException;
import com.applications.Applications.model.SheetModel;
import com.applications.Applications.payload.request.SheetRequestPayload;
import com.applications.Applications.payload.response.SheetResponsePayload;
import com.applications.Applications.repository.SheetRepository;
import com.applications.Applications.service.SheetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

@Service
public class SheetServiceImplementation implements SheetService {
    @Autowired
    private SheetRepository sheetRepository;

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    Logger logger = LoggerFactory.getLogger(SheetServiceImplementation.class);

    @Override
    public SheetResponsePayload getSheet(SheetRequestPayload sheetRequestPayload) {
        logger.info("getSheet method invoked with email : " + sheetRequestPayload);

        SheetModel sheetModel = sheetRepository.findByEmail(sheetRequestPayload.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Sheet", "User", "user"));

        return mapToDto(sheetModel);
    }

    @Override
    public SheetResponsePayload updateSheet(SheetRequestPayload sheetRequestPayload) {
        logger.info("updateSheet method invoked with sheetPayload : " + sheetRequestPayload);
        SheetModel sheetModel = mapToEntity(sheetRequestPayload);
        SheetModel response = sheetRepository.save(sheetModel);
        return mapToDto(response);
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
