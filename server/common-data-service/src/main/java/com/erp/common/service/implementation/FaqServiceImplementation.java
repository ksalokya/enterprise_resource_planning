package com.erp.common.service.implementation;

import com.erp.common.model.faq.FaqModel;
import com.erp.common.payload.response.FaqResponsePayload;
import com.erp.common.repository.FaqRepository;
import com.erp.common.service.FaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FaqServiceImplementation implements FaqService {

    @Autowired
    private FaqRepository faqRepository;

    @Override
    public List<FaqResponsePayload> getAllFaqs() {
        List<FaqModel> faqModelList = faqRepository.findAll();
        return mapToPayload(faqModelList);
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
