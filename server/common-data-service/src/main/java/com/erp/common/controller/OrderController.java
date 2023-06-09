package com.erp.common.controller;

import com.erp.common.payload.request.OrderRequestPayload;
import com.erp.common.payload.response.OrderResponsePayload;
import com.erp.common.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
    Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getAllOrdersController(@PathVariable(name = "userId") long user_id) {
        logger.info("getAllOrdersController method invoked with user id :: " + user_id);
        List<OrderResponsePayload> orderResponsePayloadList = orderService.getAllOrders(user_id);
        return new ResponseEntity<>(orderResponsePayloadList, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertOrderController(@RequestBody OrderRequestPayload orderRequestPayload) {
        logger.info("insertOrderController method invoked with payload :: " + orderRequestPayload);
        OrderResponsePayload orderResponsePayload = orderService.insertOrder(orderRequestPayload);
        return new ResponseEntity<>(orderResponsePayload, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateOrderController(@PathVariable(name = "id") long id,
                                                            @RequestBody OrderRequestPayload orderRequestPayload) {
        logger.info("updateOrderController method invoked with userId & payload :: " + id + " " + orderRequestPayload);
        orderService.updateOrder(id, orderRequestPayload);
        return new ResponseEntity<>("success", HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/{id}/{userId}")
    public ResponseEntity<?> deleteOrderController(@PathVariable(name = "id") long id,
                                                   @PathVariable(name = "userId") long userId) {
        logger.info("deleteOrderController method invoked with id & usersId :: " + id + " " + userId);
        orderService.deleteOrder(id, userId);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
