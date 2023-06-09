package com.erp.common.service.implementation;

import com.erp.common.model.FaqModel;
import com.erp.common.payload.request.FaqRequestPayload;
import com.erp.common.payload.response.FaqResponsePayload;
import com.erp.common.repository.FaqRepository;
import com.erp.common.service.FaqService;
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
public class FaqServiceImplementation implements FaqService {

    Logger logger = LoggerFactory.getLogger(FaqServiceImplementation.class);

    @Autowired
    private FaqRepository faqRepository;

    @Bean
    public ModelMapper faqModelMapper() {
        return new ModelMapper();
    }

    @Override
    public List<FaqResponsePayload> getAllFaqs(long userId) {
        // TODO :: Handle Exception
        logger.info("getAllFaqsById method invoked with user id :: " + userId);
        List<FaqModel> faqModelList = faqRepository.findAllByUserId(userId).orElseThrow();
        return mapToDtoList(faqModelList);
    }

    @Override
    public FaqResponsePayload insertFaq(FaqRequestPayload faqRequestPayload) {
        logger.info("insertFaq method invoked with payload :: " + faqRequestPayload);
        FaqModel faqModel = mapToEntity(faqRequestPayload);
        FaqModel insertedFaqModel = faqRepository.save(faqModel);
        return mapToDto(insertedFaqModel);
    }

    @Override
    public void updateFaq(long faqId, FaqRequestPayload faqRequestPayload) {
        logger.info("updateFaq method invoked with faqId :: " + faqId);
        faqRepository.saveByIdAndUserId(faqId, faqRequestPayload.getUserId(),
                faqRequestPayload.getQuestion(), faqRequestPayload.getAnswer());
    }

    @Override
    public void deleteFaq(long userId, long faqId) {
        logger.info("deleteFaq method invoked with user id :: " + userId);
        faqRepository.removeByIdAndUserId(faqId, userId);
    }

    private FaqModel mapToEntity(FaqRequestPayload FaqRequestPayload) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(FaqRequestPayload, FaqModel.class);
    }

    private FaqResponsePayload mapToDto(FaqModel FaqModel) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(FaqModel, FaqResponsePayload.class);
    }

    private List<FaqResponsePayload> mapToDtoList(List<FaqModel> FaqModel) {
        ModelMapper modelMapper = new ModelMapper();
        return Arrays.asList(modelMapper.map(FaqModel, FaqResponsePayload[].class));
    }
}
