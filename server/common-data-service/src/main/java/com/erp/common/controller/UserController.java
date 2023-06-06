package com.erp.common.controller;

import com.erp.common.payload.request.UserRequestPayload;
import com.erp.common.payload.response.UserResponsePayload;
import com.erp.common.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getAllUsersController(@PathVariable(name = "userId") long userId) {
        logger.info("getAllUsersController method invoked with userID :: " + userId);
        List<UserResponsePayload> userResponsePayloadList = userService.findAllUsersByEmail(userId);
        return new ResponseEntity<>(userResponsePayloadList, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertUsersController(@RequestBody UserRequestPayload userRequestPayload) {
        logger.info("insertUsersController method invoked with payload :: " + userRequestPayload);
        UserResponsePayload userResponsePayload = userService.insertUserData(userRequestPayload);
        return new ResponseEntity<>(userResponsePayload, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> putUsersController(@PathVariable(name = "id") long id,
                                                @RequestBody UserRequestPayload userRequestPayload) {
        logger.info("insertUsersController method invoked with userId & payload :: " + id + " " + userRequestPayload);
        userService.updateUser(id, userRequestPayload);
        return new ResponseEntity<>("success", HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/{id}/{userId}")
    public ResponseEntity<?> deleteUsersController(@PathVariable(name = "id") long id,
                                                   @PathVariable(name = "userId") long userId) {
        logger.info("insertUsersController method invoked with id & usersId :: " + id + " " + userId);
        userService.deleteUser(id, userId);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
