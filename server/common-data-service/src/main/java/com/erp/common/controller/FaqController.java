package com.erp.common.controller;

import com.erp.common.payload.request.FaqRequestPayload;
import com.erp.common.payload.response.FaqResponsePayload;
import com.erp.common.service.FaqService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/faq")
public class FaqController {
    Logger logger = LoggerFactory.getLogger(FaqController.class);

    @Autowired
    private FaqService faqService;

    // TODO :: Add Redis
    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getAllFaqsController(@PathVariable(name = "userId") long user_id) {
        logger.info("getAllFaqsController method invoked with user id :: " + user_id);
        List<FaqResponsePayload> faqResponsePayloadList = faqService.getAllFaqsById(user_id);
        return new ResponseEntity<>(faqResponsePayloadList, HttpStatus.OK);
    }

    @PostMapping("/insert/{userId}")
    public ResponseEntity<?> insertFaqController(@PathVariable(name = "userId") long user_id,
                                                 @RequestBody FaqRequestPayload faqRequestPayload) {
        logger.info("insertFaqController method invoked with user id :: " + user_id);
        FaqResponsePayload faqResponsePayloadList = faqService.insertFaq(user_id, faqRequestPayload);
        return new ResponseEntity<>(faqResponsePayloadList, HttpStatus.OK);
    }

    @PatchMapping("/patch/{userId}/{faqId}")
    public ResponseEntity<?> patchFaqController(@PathVariable(name = "userId") long user_id,
                                                @PathVariable(name = "faqId") long faq_id,
                                                @RequestBody FaqRequestPayload faqRequestPayload) {
        logger.info("patchFaqController method invoked with user id :: " + user_id);
        faqService.updateFaq(user_id, faq_id, faqRequestPayload);
        return new ResponseEntity<>("Updated Successfully", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{userId}/{faqId}")
    public ResponseEntity<?> deleteFaqController(@PathVariable(name = "userId") long user_id,
                                                 @PathVariable(name = "faqId") long faq_id) {
        logger.info("insertFaqController method invoked with user id :: " + user_id);
        faqService.deleteFaq(user_id, faq_id);
        return new ResponseEntity<>("Deleted Successfully", HttpStatus.OK);
    }
}
