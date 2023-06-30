package com.erp.common.controller;

import com.erp.common.payload.request.UserRequestPayload;
import com.erp.common.payload.response.UserInfoResponsePayload;
import com.erp.common.service.UserService;
import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.CompletableFuture;

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
    @TimeLimiter(name = "auth-service")
    @CircuitBreaker(name = "auth-service", fallbackMethod = "futureFallback")
    @Bulkhead(name = "auth-service", type = Bulkhead.Type.THREADPOOL)
    @Retry(name = "auth-service")
    public CompletableFuture<String> insertUsersController(@ModelAttribute UserRequestPayload userRequestPayload,
                                                           @RequestParam("image") MultipartFile file) {
        logger.info("insertUsersController method invoked with admin id :: " + userRequestPayload.getAdminId());
        String result = userService.insertUserData(userRequestPayload, file);
        return CompletableFuture.supplyAsync(() -> result);
    }

    // TODO :: Move circuit breaker to service impl
    public CompletableFuture<String> futureFallback(UserRequestPayload userRequestPayload,
                                                    MultipartFile file,
                                                    RuntimeException runtimeException) {
        return CompletableFuture.supplyAsync(() -> "Oops! Something went wrong");
    }

    @PutMapping("/update/image/{id}")
    public ResponseEntity<?> updateUserController(@PathVariable(name = "id") long id,
                                                  @ModelAttribute UserRequestPayload userRequestPayload,
                                                  @RequestParam("image") MultipartFile file) {
        logger.info("updateUserController method invoked with id & admin id :: " + id + " " + userRequestPayload.getAdminId());
        String res = userService.updateUser(id, userRequestPayload, file);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
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
