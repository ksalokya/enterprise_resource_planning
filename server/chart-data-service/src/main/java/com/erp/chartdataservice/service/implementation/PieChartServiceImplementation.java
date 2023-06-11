package com.erp.chartdataservice.service.implementation;

import com.erp.chartdataservice.model.PieChartModel;
import com.erp.chartdataservice.payload.request.PieChartRequestPayload;
import com.erp.chartdataservice.payload.response.PieChartResponsePayload;
import com.erp.chartdataservice.repository.PieChartRepository;
import com.erp.chartdataservice.service.PieChartService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class PieChartServiceImplementation implements PieChartService {
    Logger logger = LoggerFactory.getLogger(PieChartServiceImplementation.class);

    @Autowired
    private PieChartRepository pieChartRepository;

    @Bean
    public ModelMapper pieChartModelMapper() {
        return new ModelMapper();
    }

    @Override
    public List<PieChartResponsePayload> getAllPieChartData(long userId) {
        // TODO :: Handle Exception
        logger.info("getAllPieChartData method invoked with user id :: " + userId);
        List<PieChartModel> pieChartModels = pieChartRepository.findAllByUserId(userId)
                .orElseThrow();
        return mapToDtoList(pieChartModels);
    }

    @Override
    public PieChartResponsePayload insertPieChartData(PieChartRequestPayload pieChartRequestPayload) {
        logger.info("insertPieChartData method invoked with payload :: " + pieChartRequestPayload);
        PieChartModel pieChartModel = mapToEntity(pieChartRequestPayload);
        PieChartModel insertedPieChartModel = pieChartRepository.save(pieChartModel);
        return mapToDto(insertedPieChartModel);
    }

    private PieChartModel mapToEntity(PieChartRequestPayload pieChartRequestPayload) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(pieChartRequestPayload, PieChartModel.class);
    }

    private PieChartResponsePayload mapToDto(PieChartModel pieChartModel) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(pieChartModel, PieChartResponsePayload.class);
    }

    private List<PieChartResponsePayload> mapToDtoList(List<PieChartModel> pieChartModel) {
        ModelMapper modelMapper = new ModelMapper();
        return Arrays.asList(modelMapper.map(pieChartModel, PieChartResponsePayload[].class));
    }
}
