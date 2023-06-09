package com.erp.common.controller;

import com.erp.common.payload.request.DeliveryRequestPayload;
import com.erp.common.payload.response.DeliveryResponsePayload;
import com.erp.common.service.DeliveryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/delivery")
public class DeliveryController {
    Logger logger = LoggerFactory.getLogger(DeliveryController.class);

    @Autowired
    private DeliveryService deliveryService;

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getAllDeliveryDataController(@PathVariable(name = "userId") long user_id) {
        logger.info("getAllDeliveryDataController method invoked with user id :: " + user_id);
        List<DeliveryResponsePayload> deliveryResponsePayloads = deliveryService.getDeliveryData(user_id);
        return new ResponseEntity<>(deliveryResponsePayloads, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertDeliveryDataController(@RequestBody DeliveryRequestPayload deliveryRequestPayload) {
        logger.info("insertDeliveryDataController method invoked with payload :: " + deliveryRequestPayload);
        DeliveryResponsePayload deliveryResponsePayload = deliveryService.createDeliveryData(deliveryRequestPayload);
        return new ResponseEntity<>(deliveryResponsePayload, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateDeliveryDataController(@PathVariable(name = "id") long id,
                                                            @RequestBody DeliveryRequestPayload deliveryRequestPayload) {
        logger.info("updateDeliveryDataController method invoked with userId & payload :: " + id + " " + deliveryRequestPayload);
        deliveryService.updateDeliveryData(id, deliveryRequestPayload);
        return new ResponseEntity<>("success", HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/{id}/{userId}")
    public ResponseEntity<?> deleteDeliveryDataController(@PathVariable(name = "id") long id,
                                                   @PathVariable(name = "userId") long userId) {
        logger.info("deleteDeliveryDataController method invoked with id & userId :: " + id + " " + userId);
        deliveryService.deleteDeliveryData(id, userId);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
