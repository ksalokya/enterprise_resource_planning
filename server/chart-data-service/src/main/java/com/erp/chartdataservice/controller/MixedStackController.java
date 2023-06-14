package com.erp.chartdataservice.controller;

import com.erp.chartdataservice.payload.request.MixedStackRequestPayload;
import com.erp.chartdataservice.payload.response.MixedStackResponsePayload;
import com.erp.chartdataservice.service.MixedStackService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/chart/mixed-stack")
public class MixedStackController {
    Logger logger = LoggerFactory.getLogger(MixedStackController.class);

    @Autowired
    private MixedStackService mixedStackService;

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getAllMixedStacksController(@PathVariable(name = "userId") long user_id) {
        logger.info("getAllMixedStacksController method invoked with user id :: " + user_id);
        List<MixedStackResponsePayload> MixedStackResponsePayloadList = mixedStackService.getAllMixedStackData(user_id);
        return new ResponseEntity<>(MixedStackResponsePayloadList, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertMixedStackController(@RequestBody MixedStackRequestPayload mixedStackRequestPayload) {
        logger.info("insertMixedStackController method invoked with user id :: " + mixedStackRequestPayload.getUserId());
        MixedStackResponsePayload MixedStackResponsePayloadList = mixedStackService.insertMixedStackData(mixedStackRequestPayload);
        return new ResponseEntity<>(MixedStackResponsePayloadList, HttpStatus.OK);
    }
}
