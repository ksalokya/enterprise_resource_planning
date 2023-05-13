package com.erp.common.service;

import com.erp.common.payload.response.FaqResponsePayload;

import java.util.List;

public interface FaqService {
    List<FaqResponsePayload> getAllFaqs();
}
