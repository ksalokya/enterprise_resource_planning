package com.erp.common.service.implementation;

import com.erp.common.model.faq.FaqModel;
import com.erp.common.payload.request.FaqRequestPayload;
import com.erp.common.payload.response.FaqResponsePayload;
import com.erp.common.repository.FaqRepository;
import com.erp.common.service.FaqService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FaqServiceImplementation implements FaqService {

    Logger logger = LoggerFactory.getLogger(FaqServiceImplementation.class);

    @Autowired
    private FaqRepository faqRepository;

    @Override
    public List<FaqResponsePayload> getAllFaqsById(long userId) {
        // TODO :: Handle Exception
        logger.info("getAllFaqsById method invoked with user id :: " + userId);
        List<FaqModel> faqModelList = faqRepository.findAllByUserId(userId).orElseThrow();
        return mapToPayload(faqModelList);
    }

    @Override
    public FaqResponsePayload insertFaq(long userId, FaqRequestPayload faqRequestPayload) {
        logger.info("insertFaq method invoked with user id :: " + userId);
        FaqModel faqModel = new FaqModel();
        faqModel.setUserId(userId);
        faqModel.setQuestion(faqRequestPayload.getQuestion());
        faqModel.setAnswer(faqRequestPayload.getAnswer());

        FaqModel insertedFaqModel = faqRepository.save(faqModel);

        FaqResponsePayload newFaqResponsePayload = new FaqResponsePayload();
        newFaqResponsePayload.setId(insertedFaqModel.getId());
        newFaqResponsePayload.setQuestion(insertedFaqModel.getQuestion());
        newFaqResponsePayload.setAnswer(insertedFaqModel.getAnswer());

        return newFaqResponsePayload;
    }

    @Override
    public void updateFaq(long userId, long faqId, FaqRequestPayload faqRequestPayload) {
        logger.info("updateFaq method invoked with user id :: " + userId);
        faqRepository.saveByIdAndUserId(faqId,
                userId,
                faqRequestPayload.getQuestion(),
                faqRequestPayload.getAnswer());
    }

    @Override
    public void deleteFaq(long userId, long faqId) {
        logger.info("deleteFaq method invoked with user id :: " + userId);
        faqRepository.removeByIdAndUserId(faqId, userId);
    }

    private List<FaqResponsePayload> mapToPayload(List<FaqModel> faqModelList) {
        List<FaqResponsePayload> faqResponsePayloadList = new ArrayList<>();
        for (FaqModel faqModel : faqModelList) {
            FaqResponsePayload faqResponsePayload = new FaqResponsePayload();
            faqResponsePayload.setId(faqModel.getId());
            faqResponsePayload.setQuestion(faqModel.getQuestion());
            faqResponsePayload.setAnswer(faqModel.getAnswer());
            faqResponsePayloadList.add(faqResponsePayload);
        }
        return faqResponsePayloadList;
    }
}
