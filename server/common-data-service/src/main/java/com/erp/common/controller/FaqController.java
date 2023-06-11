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
@RequestMapping("/api/v1/common/faq")
public class FaqController {
    Logger logger = LoggerFactory.getLogger(FaqController.class);

    @Autowired
    private FaqService faqService;

    // TODO :: Add Redis
    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getAllFaqsController(@PathVariable(name = "userId") long user_id) {
        logger.info("getAllFaqsController method invoked with user id :: " + user_id);
        List<FaqResponsePayload> faqResponsePayloadList = faqService.getAllFaqs(user_id);
        return new ResponseEntity<>(faqResponsePayloadList, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertFaqController(@RequestBody FaqRequestPayload faqRequestPayload) {
        logger.info("insertFaqController method invoked with payload :: " + faqRequestPayload);
        FaqResponsePayload faqResponsePayloadList = faqService.insertFaq(faqRequestPayload);
        return new ResponseEntity<>(faqResponsePayloadList, HttpStatus.OK);
    }

    @PutMapping("/update/{faqId}")
    public ResponseEntity<?> updateFaqController(@PathVariable(name = "faqId") long faq_id,
                                                 @RequestBody FaqRequestPayload faqRequestPayload) {
        logger.info("patchFaqController method invoked with faqId :: " + faq_id);
        faqService.updateFaq(faq_id, faqRequestPayload);
        return new ResponseEntity<>("Updated Successfully", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{userId}/{faqId}")
    public ResponseEntity<?> deleteFaqController(@PathVariable(name = "userId") long user_id,
                                                 @PathVariable(name = "faqId") long faq_id) {
        logger.info("deleteFaqController method invoked with user id :: " + user_id);
        faqService.deleteFaq(user_id, faq_id);
        return new ResponseEntity<>("Deleted Successfully", HttpStatus.OK);
    }
}
