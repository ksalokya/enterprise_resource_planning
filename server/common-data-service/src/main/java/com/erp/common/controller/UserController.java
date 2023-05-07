package com.erp.common.controller;

import com.erp.common.payload.request.UserRequestPayload;
import com.erp.common.payload.response.UserResponsePayload;
import com.erp.common.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/api/v1/user/get")
    public ResponseEntity<?> getAllUsersController(@RequestBody UserRequestPayload userRequestPayload) {
        logger.info("getAllUsersController method invoked with email :: " + userRequestPayload);
        List<UserResponsePayload> userResponsePayloadList = userService.findAllUsersByEmail(userRequestPayload.getEmail());
        return new ResponseEntity<>(userResponsePayloadList, HttpStatus.OK);
    }
}
