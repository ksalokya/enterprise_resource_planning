package com.erp.common.service.implementation;

import com.erp.common.model.delivery.DeliveryModel;
import com.erp.common.payload.request.DeliveryRequestPayload;
import com.erp.common.payload.response.DeliveryResponsePayload;
import com.erp.common.repository.DeliveryRepository;
import com.erp.common.service.DeliveryService;
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
public class DeliveryServiceImplementation implements DeliveryService {
    Logger logger = LoggerFactory.getLogger(DeliveryServiceImplementation.class);

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Bean
    public ModelMapper deliveryModelMapper() {
        return new ModelMapper();
    }

    @Override
    public DeliveryResponsePayload createDeliveryData(DeliveryRequestPayload deliveryRequestPayload) {
        logger.info("getDeliveryData method invoked with payload :: " + deliveryRequestPayload);
        DeliveryModel deliveryModel = mapToEntity(deliveryRequestPayload);
        DeliveryModel newDeliveryModel = deliveryRepository.save(deliveryModel);
        return mapToDto(newDeliveryModel);
    }

    @Override
    public List<DeliveryResponsePayload> getDeliveryData(long userId) {
        logger.info("getDeliveryData method invoked with user id :: " + userId);
        // TODO :: Handle Exception
        List<DeliveryModel> deliveryModels = deliveryRepository.getAllByUserId(userId)
                .orElseThrow();
        return mapToDtoList(deliveryModels);
    }

    private DeliveryModel mapToEntity(DeliveryRequestPayload deliveryRequestPayload) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(deliveryRequestPayload, DeliveryModel.class);
    }

    private DeliveryResponsePayload mapToDto(DeliveryModel deliveryModel) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(deliveryModel, DeliveryResponsePayload.class);
    }

    private List<DeliveryResponsePayload> mapToDtoList(List<DeliveryModel> deliveryModel) {
        ModelMapper modelMapper = new ModelMapper();
        return Arrays.asList(modelMapper.map(deliveryModel, DeliveryResponsePayload[].class));
    }
}
