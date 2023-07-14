package com.erp.authentication.controller;

import com.erp.authentication.config.UserInfoUserDetails;
import com.erp.authentication.entity.UserInfo;
import com.erp.authentication.payload.AuthRequest;
import com.erp.authentication.payload.AuthResponse;
import com.erp.authentication.service.AuthenticationService;
import com.erp.authentication.service.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/health")
    public String healthStatus() {
        logger.info("healthStatus method invoked");
        return "Up!";
    }

    @GetMapping("/user/message")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String secretMessage() {
        logger.info("secretMessage method invoked for ROLE USER");
        return "You are authorized as a user!";
    }

    @GetMapping("/admin/message")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String adminSecretMessage() {
        logger.info("secretMessage method invoked for ROLE ADMIN");
        return "You are authorized as a admin!";
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        authenticationService.validateToken(token);
        return "Token is valid";
    }

    @PostMapping("/new")
    public ResponseEntity<String> addUser(@RequestBody UserInfo userInfo) {
        logger.info("addUser method invoked with username :: " + userInfo.getUsername());
        String response = authenticationService.saveUser(userInfo);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public AuthResponse authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        logger.info("authenticateAndGetToken method invoked with username :: " + authRequest.getUsername());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(),
                        authRequest.getPassword()));

        if (authentication.isAuthenticated()) {
            UserInfoUserDetails userInfoUserDetails = (UserInfoUserDetails) authentication.getPrincipal();
            return new AuthResponse(
                    userInfoUserDetails.getId(),
                    authRequest.getUsername(),
                    jwtService.generateToken(authRequest.getUsername()),
                    true);
        } else {
            throw new UsernameNotFoundException("Invalid user request");
        }
    }
}
