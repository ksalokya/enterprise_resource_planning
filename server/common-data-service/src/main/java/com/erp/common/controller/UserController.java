package com.erp.common.controller;

import com.erp.common.payload.request.UserRequestPayload;
import com.erp.common.payload.response.UserResponsePayload;
import com.erp.common.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(userResponsePayloadList);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertUsersController(@ModelAttribute UserRequestPayload userRequestPayload,
                                                   @RequestParam("image") MultipartFile file) {
        logger.info("insertUsersController method invoked with payload :: " + userRequestPayload);
        UserResponsePayload userResponsePayload = userService.insertUserData(userRequestPayload, file);
        return new ResponseEntity<>("", HttpStatus.CREATED);
    }

    @PutMapping("/update/image/{id}")
    public ResponseEntity<?> putUsersController(@PathVariable(name = "id") long id,
                                                @ModelAttribute UserRequestPayload userRequestPayload,
                                                @RequestParam("image") MultipartFile file) {
        logger.info("insertUsersController method invoked with userId & payload :: " + id + " " + userRequestPayload);
        userService.updateUser(id, userRequestPayload, file);
        return new ResponseEntity<>("success", HttpStatus.ACCEPTED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> putUsersWithOutImageController(@PathVariable(name = "id") long id,
                                                @ModelAttribute UserRequestPayload userRequestPayload) {
        logger.info("insertUsersController method invoked with userId & payload :: " + id + " " + userRequestPayload);
        userService.updateUserWithOutImage(id, userRequestPayload);
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
