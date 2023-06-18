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
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
public class FaqServiceImplementation implements FaqService {

    @Autowired
    private FaqRepository faqRepository;

    @Autowired
    private RedisTemplate redisTemplate;

    @Bean
    public ModelMapper faqModelMapper() {
        return new ModelMapper();
    }

    @Override
    public List<FaqResponsePayload> getAllFaqs(long userId) {
        final String key = "post_" + userId;
        final ValueOperations<String, List<FaqModel>> operations = redisTemplate.opsForValue();
        final boolean hasKey = Boolean.TRUE.equals(redisTemplate.hasKey(key));

        if (hasKey) {
            List<FaqModel> faqModelList = operations.get(key);
            System.out.println("Fetching cached FaqModels >> " + faqModelList);
            return mapToDtoList(faqModelList);
        }

        Optional<List<FaqModel>> faqModelList = faqRepository.findAllByUserId(userId);

        if (faqModelList.isPresent()) {
            operations.set(key, faqModelList.get(), 15, TimeUnit.MINUTES);
            System.out.println("Caching FaqModels >> " + faqModelList.get());
            return mapToDtoList(faqModelList.get());
        } else {
            throw new ResourceNotFoundException("FaqModel", "userId", userId);
        }
    }

    @Override
    public FaqResponsePayload insertFaq(FaqRequestPayload faqRequestPayload) {
        final String key = "post_" + faqRequestPayload.getUserId();
        final boolean hasKey = redisTemplate.hasKey(key);
        if (hasKey) {
            redisTemplate.delete(key);
            System.out.println("Deleting FaqModels >> " + faqRequestPayload.getUserId());
        }
        FaqModel faqModel = mapToEntity(faqRequestPayload);
        FaqModel insertedFaqModel = faqRepository.save(faqModel);
        return mapToDto(insertedFaqModel);
    }

    @Override
    public void updateFaq(long faqId, FaqRequestPayload faqRequestPayload) {
        final String key = "post_" + faqRequestPayload.getUserId();
        final boolean hasKey = redisTemplate.hasKey(key);
        if (hasKey) {
            redisTemplate.delete(key);
            System.out.println("Deleting FaqModels >> " + faqRequestPayload.getUserId());
        }
        faqRepository.saveByIdAndUserId(faqId, faqRequestPayload.getUserId(),
                faqRequestPayload.getQuestion(), faqRequestPayload.getAnswer());
    }

    @Override
    public void deleteFaq(long userId, long faqId) {
        final String key = "post_" + userId;
        final boolean hasKey = redisTemplate.hasKey(key);
        if (hasKey) {
            redisTemplate.delete(key);
            System.out.println("Deleting FaqModels >> " + userId);
        }
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
