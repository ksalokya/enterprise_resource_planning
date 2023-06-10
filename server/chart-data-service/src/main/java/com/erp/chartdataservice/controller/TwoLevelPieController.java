package com.erp.chartdataservice.controller;

import com.erp.chartdataservice.payload.request.TwoLevelPieRequestPayload;
import com.erp.chartdataservice.payload.response.twolevelpie.TwoLevelPieChartData;
import com.erp.chartdataservice.payload.response.twolevelpie.TwoLevelPieResponsePayload;
import com.erp.chartdataservice.service.TwoLevelPieService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/two-level-pie")
public class TwoLevelPieController {
    Logger logger = LoggerFactory.getLogger(TwoLevelPieController.class);

    @Autowired
    private TwoLevelPieService twoLevelPieService;

    // TODO :: Add Redis
    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getAllTwoLevelPiesController(@PathVariable(name = "userId") long user_id) {
        logger.info("getAllTwoLevelPiesController method invoked with user id :: " + user_id);
        TwoLevelPieResponsePayload twoLevelPieResponsePayloadList = twoLevelPieService.getAllTwoLevelPieData(user_id);
        return new ResponseEntity<>(twoLevelPieResponsePayloadList, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertTwoLevelPieController(@RequestBody TwoLevelPieRequestPayload twoLevelPieRequestPayload) {
        logger.info("insertTwoLevelPieController method invoked with payload :: " + twoLevelPieRequestPayload);
        TwoLevelPieChartData twoLevelPieChartData = twoLevelPieService.insertTwoLevelPieData(twoLevelPieRequestPayload);
        return new ResponseEntity<>(twoLevelPieChartData, HttpStatus.OK);
    }
}
