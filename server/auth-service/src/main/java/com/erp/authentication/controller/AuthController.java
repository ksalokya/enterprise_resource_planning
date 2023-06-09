package com.erp.authentication.controller;

import com.erp.authentication.payload.AuthRequest;
import com.erp.authentication.entity.UserInfo;
import com.erp.authentication.repository.UserInfoRepository;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    Logger logger = LoggerFactory.getLogger(AuthController.class);

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

    @PostMapping("/new")
    public ResponseEntity<String> addUser(@RequestBody UserInfo userInfo) {
        logger.info("addUser method invoked with username :: " + userInfo.getUsername());
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        userInfoRepository.save(userInfo);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        logger.info("authenticateAndGetToken method invoked with username :: " + authRequest.getUsername());
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("Invalid user request");
        }
    }
}
