package com.erp.chartdataservice.service.implementation;

import com.erp.chartdataservice.model.TwoLevelPieModel;
import com.erp.chartdataservice.payload.request.TwoLevelPieRequestPayload;
import com.erp.chartdataservice.payload.response.twolevelpie.TwoLevelPieChartData;
import com.erp.chartdataservice.payload.response.twolevelpie.TwoLevelPieResponsePayload;
import com.erp.chartdataservice.repository.TwoLevelPieRepository;
import com.erp.chartdataservice.service.TwoLevelPieService;
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
public class TwoLevelPieServiceImplementation implements TwoLevelPieService {
    Logger logger = LoggerFactory.getLogger(TwoLevelPieServiceImplementation.class);

    @Autowired
    private TwoLevelPieRepository twoLevelPieRepository;

    @Bean
    public ModelMapper twoLevelPieModelMapper() {
        return new ModelMapper();
    }

    @Override
    public TwoLevelPieResponsePayload getAllTwoLevelPieData(long userId) {
        // TODO :: Handle Exception
        logger.info("getAllTwoLevelPieData method invoked with user id :: " + userId);
        List<TwoLevelPieModel> twoLevelPieModelsOfGroup = twoLevelPieRepository.findAllByTypeAndUserId("GROUP", userId)
                .orElseThrow();
        List<TwoLevelPieModel> twoLevelPieModelsOfData = twoLevelPieRepository.findAllByTypeAndUserId("DATA", userId)
                .orElseThrow();
        return new TwoLevelPieResponsePayload(mapToDtoList(twoLevelPieModelsOfGroup), mapToDtoList(twoLevelPieModelsOfData));
    }

    @Override
    public TwoLevelPieChartData insertTwoLevelPieData(TwoLevelPieRequestPayload twoLevelPieRequestPayload) {
        logger.info("insertTwoLevelPieData method invoked with payload :: " + twoLevelPieRequestPayload);
        TwoLevelPieModel twoLevelPieModel = mapToEntity(twoLevelPieRequestPayload);
        TwoLevelPieModel insertedTwoLevelPieModel = twoLevelPieRepository.save(twoLevelPieModel);
        return mapToDto(insertedTwoLevelPieModel);
    }

    private TwoLevelPieModel mapToEntity(TwoLevelPieRequestPayload twoLevelPieRequestPayload) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(twoLevelPieRequestPayload, TwoLevelPieModel.class);
    }

    private TwoLevelPieChartData mapToDto(TwoLevelPieModel twoLevelPieModel) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(twoLevelPieModel, TwoLevelPieChartData.class);
    }

    private List<TwoLevelPieChartData> mapToDtoList(List<TwoLevelPieModel> twoLevelPieModel) {
        ModelMapper modelMapper = new ModelMapper();
        return Arrays.asList(modelMapper.map(twoLevelPieModel, TwoLevelPieChartData[].class));
    }
}
