package com.erp.common.service.implementation;

import com.erp.common.exception.ResourceNotFoundException;
import com.erp.common.model.DeliveryModel;
import com.erp.common.payload.request.DeliveryRequestPayload;
import com.erp.common.payload.response.DeliveryResponsePayload;
import com.erp.common.repository.DeliveryRepository;
import com.erp.common.service.DeliveryService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class DeliveryServiceImplementation implements DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Bean
    public ModelMapper deliveryModelMapper() {
        return new ModelMapper();
    }

    @Override
    public DeliveryResponsePayload createDeliveryData(DeliveryRequestPayload deliveryRequestPayload) {
        DeliveryModel deliveryModel = mapToEntity(deliveryRequestPayload);
        DeliveryModel insertedDeliveryModel = deliveryRepository.save(deliveryModel);
        return mapToDto(insertedDeliveryModel);
    }

    @Override
    public List<DeliveryResponsePayload> getDeliveryData(long userId) {
        List<DeliveryModel> deliveryModels = deliveryRepository.findAllByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("DeliveryModel", "userId", userId));
        return mapToDtoList(deliveryModels);
    }

    @Override
    public void updateDeliveryData(long deliveryDataId, DeliveryRequestPayload deliveryRequestPayload) {
        deliveryRepository.saveByIdAndUserId(deliveryDataId, deliveryRequestPayload.getUserId(),
                deliveryRequestPayload.getCode(), deliveryRequestPayload.getValue(),
                deliveryRequestPayload.getName(), deliveryRequestPayload.getPopulation(),
                deliveryRequestPayload.getDensity());
    }

    @Override
    public void deleteDeliveryData(long id, long userId) {
        deliveryRepository.removeByIdAndUserId(id, userId);
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
