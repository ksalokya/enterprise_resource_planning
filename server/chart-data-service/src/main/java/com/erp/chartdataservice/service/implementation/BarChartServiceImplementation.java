package com.erp.chartdataservice.service.implementation;

import com.erp.chartdataservice.exception.ResourceNotFoundException;
import com.erp.chartdataservice.model.BarChartModel;
import com.erp.chartdataservice.payload.request.BarChartRequestPayload;
import com.erp.chartdataservice.payload.response.BarChartResponsePayload;
import com.erp.chartdataservice.repository.BarChartRepository;
import com.erp.chartdataservice.service.BarChartService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class BarChartServiceImplementation implements BarChartService {

    Logger logger = LoggerFactory.getLogger(BarChartServiceImplementation.class);

    @Autowired
    private BarChartRepository barChartRepository;


    @Override
    public List<BarChartResponsePayload> getAllBarChartData(long userId) {
        List<BarChartModel> barChartModels = barChartRepository.findAllByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("BarChartModel", "userId", userId));
        return mapToDtoList(barChartModels);
    }

    @Override
    public BarChartResponsePayload insertBarChartData(BarChartRequestPayload barChartRequestPayload) {
        BarChartModel barChartModel = mapToEntity(barChartRequestPayload);
        BarChartModel insertedBarChartModel = barChartRepository.save(barChartModel);
        return mapToDto(insertedBarChartModel);
    }

    private BarChartModel mapToEntity(BarChartRequestPayload barChartRequestPayload) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(barChartRequestPayload, BarChartModel.class);
    }

    private BarChartResponsePayload mapToDto(BarChartModel barChartModel) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(barChartModel, BarChartResponsePayload.class);
    }

    private List<BarChartResponsePayload> mapToDtoList(List<BarChartModel> barChartModel) {
        ModelMapper modelMapper = new ModelMapper();
        return Arrays.asList(modelMapper.map(barChartModel, BarChartResponsePayload[].class));
    }
}
