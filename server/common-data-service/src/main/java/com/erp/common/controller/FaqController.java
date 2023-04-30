package com.erp.common.controller;

import com.erp.common.payload.response.FaqResponsePayload;
import com.erp.common.service.FaqService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/faq")
public class FaqController {
    Logger logger = LoggerFactory.getLogger(FaqController.class);

    @Autowired
    private FaqService faqService;

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getAllFaqs(@PathVariable(name = "userId") long user_id) {
        logger.info("getAllFaqs method invoked with user id :: " + user_id);
        List<FaqResponsePayload> faqResponsePayloadList = faqService.getAllFaqsById(user_id);
        return new ResponseEntity<>(faqResponsePayloadList, HttpStatus.OK);
    }

}
