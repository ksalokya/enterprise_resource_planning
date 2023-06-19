package com.erp.system.controller;

import com.erp.system.entity.SystemDetails;
import com.erp.system.information.SystemInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/system")
public class SystemController {
    Logger logger = LoggerFactory.getLogger(SystemController.class);

    @GetMapping("/details")
    public ResponseEntity<SystemDetails> getOsInfo() {
        logger.info("getOsInfo method invoked");
        SystemDetails systemDetails = new SystemInfo().getSystemInfo();
        return new ResponseEntity<>(systemDetails, HttpStatus.OK);
    }
}
