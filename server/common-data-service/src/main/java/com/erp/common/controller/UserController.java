package com.erp.common.controller;

import com.erp.common.payload.request.UserRequestPayload;
import com.erp.common.payload.response.UserInfoResponsePayload;
import com.erp.common.service.UserService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/common/user")
public class UserController {
    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/get/{adminId}")
    public ResponseEntity<?> getAllUsersController(@PathVariable(name = "adminId") long adminId) {
        logger.info("getAllUsersController method invoked with admin id :: " + adminId);
        List<UserInfoResponsePayload> userInfoResponsePayloadList = userService.findAllUsersByEmail(adminId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(userInfoResponsePayloadList);
    }

    @PostMapping("/insert")
    @CircuitBreaker(name = "auth-service", fallbackMethod = "fallbackMethod")
    public ResponseEntity<?> insertUsersController(@ModelAttribute UserRequestPayload userRequestPayload,
                                                   @RequestParam("image") MultipartFile file) {
        logger.info("insertUsersController method invoked with admin id :: " + userRequestPayload.getAdminId());
        UserInfoResponsePayload userInfoResponsePayload = userService.insertUserData(userRequestPayload, file);
        return new ResponseEntity<>(userInfoResponsePayload, HttpStatus.CREATED);
    }

    public ResponseEntity<?> fallbackMethod(UserRequestPayload userRequestPayload, MultipartFile file, RuntimeException runtimeException) {
        return new ResponseEntity<>("OOPS! Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/update/image/{id}")
    public ResponseEntity<?> updateUserController(@PathVariable(name = "id") long id,
                                                  @ModelAttribute UserRequestPayload userRequestPayload,
                                                  @RequestParam("image") MultipartFile file) {
        logger.info("updateUserController method invoked with id & admin id :: " + id + " " + userRequestPayload.getAdminId());
        userService.updateUser(id, userRequestPayload, file);
        return new ResponseEntity<>("success", HttpStatus.ACCEPTED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatedUserWithOutImageController(@PathVariable(name = "id") long id,
                                                               @ModelAttribute UserRequestPayload userRequestPayload) {
        logger.info("updatedUserWithOutImageController method invoked with id & admin id :: " + id + " " + userRequestPayload.getAdminId());
        userService.updateUserWithOutImage(id, userRequestPayload);
        return new ResponseEntity<>("success", HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/{id}/{adminId}")
    public ResponseEntity<?> deleteUsersController(@PathVariable(name = "id") long id,
                                                   @PathVariable(name = "adminId") long adminId) {
        logger.info("deleteUsersController method invoked with id & admin id :: " + id + " " + adminId);
        userService.deleteUser(id, adminId);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
