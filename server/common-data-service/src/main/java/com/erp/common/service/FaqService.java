package com.erp.common.service;

import com.erp.common.payload.request.FaqRequestPayload;
import com.erp.common.payload.response.FaqResponsePayload;

import java.util.List;

public interface FaqService {
    List<FaqResponsePayload> getAllFaqsById(long userId);
    FaqResponsePayload insertFaq(long userId, FaqRequestPayload faqRequestPayload);

    void updateFaq(long userId, long faqId, FaqRequestPayload faqRequestPayload);

    void deleteFaq(long userId, long faqId);
}
