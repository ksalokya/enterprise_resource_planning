package com.erp.common.service.implementation;

import com.erp.common.exception.ResourceNotFoundException;
import com.erp.common.model.FaqModel;
import com.erp.common.payload.request.FaqRequestPayload;
import com.erp.common.payload.response.FaqResponsePayload;
import com.erp.common.repository.FaqRepository;
import com.erp.common.service.FaqService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class FaqServiceImplementation implements FaqService {

    @Autowired
    private FaqRepository faqRepository;

    @Bean
    public ModelMapper faqModelMapper() {
        return new ModelMapper();
    }

    @Override
    public List<FaqResponsePayload> getAllFaqs(long userId) {
        List<FaqModel> faqModelList = faqRepository.findAllByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("FaqModel", "userId", userId));
        return mapToDtoList(faqModelList);
    }

    @Override
    public FaqResponsePayload insertFaq(FaqRequestPayload faqRequestPayload) {
        FaqModel faqModel = mapToEntity(faqRequestPayload);
        FaqModel insertedFaqModel = faqRepository.save(faqModel);
        return mapToDto(insertedFaqModel);
    }

    @Override
    public void updateFaq(long faqId, FaqRequestPayload faqRequestPayload) {
        faqRepository.saveByIdAndUserId(faqId, faqRequestPayload.getUserId(),
                faqRequestPayload.getQuestion(), faqRequestPayload.getAnswer());
    }

    @Override
    public void deleteFaq(long userId, long faqId) {
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
