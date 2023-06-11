package com.erp.chartdataservice.controller;

import com.erp.chartdataservice.payload.request.PieChartRequestPayload;
import com.erp.chartdataservice.payload.response.PieChartResponsePayload;
import com.erp.chartdataservice.service.PieChartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/chart/pie")
public class PieChartController {
    Logger logger = LoggerFactory.getLogger(PieChartController.class);

    @Autowired
    private PieChartService pieChartService;

    // TODO :: Add Redis
    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getAllPieChartsController(@PathVariable(name = "userId") long user_id) {
        logger.info("getAllPieChartsController method invoked with user id :: " + user_id);
        List<PieChartResponsePayload> PieChartResponsePayloadList = pieChartService.getAllPieChartData(user_id);
        return new ResponseEntity<>(PieChartResponsePayloadList, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertPieChartController(@RequestBody PieChartRequestPayload PieChartRequestPayload) {
        logger.info("insertPieChartController method invoked with payload :: " + PieChartRequestPayload);
        PieChartResponsePayload PieChartResponsePayloadList = pieChartService.insertPieChartData(PieChartRequestPayload);
        return new ResponseEntity<>(PieChartResponsePayloadList, HttpStatus.OK);
    }
}
