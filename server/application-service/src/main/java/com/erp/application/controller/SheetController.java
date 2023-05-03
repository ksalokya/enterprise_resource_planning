package com.erp.application.controller;

import com.erp.application.payload.request.SheetRequestPayload;
import com.erp.application.payload.response.SheetResponsePayload;
import com.erp.application.service.SheetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@RestController
public class SheetController {
    Logger logger = LoggerFactory.getLogger(SheetController.class);

    @Autowired
    private SheetService sheetService;

//    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/v1/sheet/get")
    public ResponseEntity<SheetResponsePayload> getSheetController(@RequestBody SheetRequestPayload sheetRequestPayload) {
        logger.info("getSheetController method invoked with email :: " + sheetRequestPayload);
        SheetResponsePayload sheetResponsePayload = sheetService.getSheet(sheetRequestPayload);
        return new ResponseEntity<>(sheetResponsePayload, HttpStatus.OK);
    }

//    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/v1/sheet/update")
    public ResponseEntity<SheetResponsePayload> saveSheetController(@RequestBody SheetRequestPayload sheetRequestPayload) {
        logger.info("saveSheetController method invoked with sheetPayload :: " + sheetRequestPayload);
        SheetResponsePayload response = sheetService.updateSheet(sheetRequestPayload);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
