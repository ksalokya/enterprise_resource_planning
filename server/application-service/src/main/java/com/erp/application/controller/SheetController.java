package com.erp.application.controller;

import com.erp.application.model.SheetModel;
import com.erp.application.payload.request.SheetRequestPayload;
import com.erp.application.payload.response.SheetResponsePayload;
import com.erp.application.service.SheetService;
import com.mongodb.client.result.UpdateResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/v1/application/sheet")
public class SheetController {
    Logger logger = LoggerFactory.getLogger(SheetController.class);

    @Autowired
    private SheetService sheetService;

    @PostMapping("/get")
    public ResponseEntity<SheetResponsePayload> getSheetController(@RequestBody SheetRequestPayload sheetRequestPayload){
        logger.info("getSheetController method invoked with email :: " + sheetRequestPayload.getEmail());
        SheetResponsePayload sheetResponsePayload = sheetService.getSheet(sheetRequestPayload);
        return new ResponseEntity<>(sheetResponsePayload, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<?> saveSheetController(@RequestBody SheetRequestPayload sheetRequestPayload) {
        logger.info("saveSheetController method invoked with email :: " + sheetRequestPayload.getEmail());
        SheetModel updatedSheet = sheetService.updateSheet(sheetRequestPayload);
        return new ResponseEntity<>(updatedSheet, HttpStatus.CREATED);
    }
}
