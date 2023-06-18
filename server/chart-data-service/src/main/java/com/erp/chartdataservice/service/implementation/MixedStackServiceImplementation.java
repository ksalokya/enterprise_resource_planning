package com.erp.chartdataservice.service.implementation;

import com.erp.chartdataservice.exception.ResourceNotFoundException;
import com.erp.chartdataservice.model.MixedStackModel;
import com.erp.chartdataservice.payload.request.MixedStackRequestPayload;
import com.erp.chartdataservice.payload.response.MixedStackResponsePayload;
import com.erp.chartdataservice.repository.MixedStackRepository;
import com.erp.chartdataservice.service.MixedStackService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class MixedStackServiceImplementation implements MixedStackService {
    Logger logger = LoggerFactory.getLogger(MixedStackServiceImplementation.class);

    @Autowired
    private MixedStackRepository mixedStackRepository;

    @Override
    public List<MixedStackResponsePayload> getAllMixedStackData(long userId) {
        List<MixedStackModel> MixedStackModels = mixedStackRepository.findAllByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("MixedStackModel", "userId", userId));
        return mapToDtoList(MixedStackModels);
    }

    @Override
    public MixedStackResponsePayload insertMixedStackData(MixedStackRequestPayload MixedStackRequestPayload) {
        MixedStackModel MixedStackModel = mapToEntity(MixedStackRequestPayload);
        MixedStackModel insertedMixedStackModel = mixedStackRepository.save(MixedStackModel);
        return mapToDto(insertedMixedStackModel);
    }

    private MixedStackModel mapToEntity(MixedStackRequestPayload MixedStackRequestPayload) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(MixedStackRequestPayload, MixedStackModel.class);
    }

    private MixedStackResponsePayload mapToDto(MixedStackModel MixedStackModel) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(MixedStackModel, MixedStackResponsePayload.class);
    }

    private List<MixedStackResponsePayload> mapToDtoList(List<MixedStackModel> MixedStackModel) {
        ModelMapper modelMapper = new ModelMapper();
        return Arrays.asList(modelMapper.map(MixedStackModel, MixedStackResponsePayload[].class));
    }
}
