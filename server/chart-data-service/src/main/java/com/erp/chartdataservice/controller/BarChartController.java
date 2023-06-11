package com.erp.chartdataservice.controller;

import com.erp.chartdataservice.payload.request.BarChartRequestPayload;
import com.erp.chartdataservice.payload.response.BarChartResponsePayload;
import com.erp.chartdataservice.service.BarChartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/chart/bar")
public class BarChartController {
    Logger logger = LoggerFactory.getLogger(BarChartController.class);

    @Autowired
    private BarChartService barChartService;

    // TODO :: Add Redis
    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getAllBarChartsController(@PathVariable(name = "userId") long user_id) {
        logger.info("getAllBarChartsController method invoked with user id :: " + user_id);
        List<BarChartResponsePayload> BarChartResponsePayloadList = barChartService.getAllBarChartData(user_id);
        return new ResponseEntity<>(BarChartResponsePayloadList, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertBarChartController(@RequestBody BarChartRequestPayload BarChartRequestPayload) {
        logger.info("insertBarChartController method invoked with payload :: " + BarChartRequestPayload);
        BarChartResponsePayload BarChartResponsePayloadList = barChartService.insertBarChartData(BarChartRequestPayload);
        return new ResponseEntity<>(BarChartResponsePayloadList, HttpStatus.OK);
    }
}
