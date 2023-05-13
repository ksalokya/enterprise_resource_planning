package com.erp.common.controller;

import com.erp.common.payload.response.FaqResponsePayload;
import com.erp.common.service.FaqService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FaqController {
    Logger logger = LoggerFactory.getLogger(FaqController.class);

    @Autowired
    private FaqService faqService;

    @GetMapping("/api/v1/faq/get")
    public ResponseEntity<?> getAllFaqs() {
        logger.info("getAllFaqs method invoked");
        List<FaqResponsePayload> faqResponsePayloadList = faqService.getAllFaqs();
        return new ResponseEntity<>(faqResponsePayloadList, HttpStatus.OK);
    }

}
