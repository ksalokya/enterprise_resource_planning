package com.erp.system.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import oshi.SystemInfo;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.software.os.OperatingSystem;

@RestController
public class SystemController {

    public static synchronized void getSystemInfo() {
        SystemInfo si = new SystemInfo();
        HardwareAbstractionLayer hal = si.getHardware();
        OperatingSystem os = si.getOperatingSystem();
        System.out.println(hal.getComputerSystem());
        System.out.println(hal.getProcessor());
        System.out.println(hal.getMemory());
        System.out.println(hal.getProcessor());
//        System.out.println(os, hal.getMemory());
        System.out.println(hal.getSensors());
        System.out.println(hal.getPowerSources());
        System.out.println(hal.getDiskStores());
        System.out.println(os.getFileSystem());
        System.out.println(hal.getNetworkIFs());
        System.out.println(os.getNetworkParams());
        System.out.println(hal.getDisplays());
    }

    @GetMapping("/api/v1/os/get")
    public ResponseEntity<?> getOsInfo() {
        System.out.println("hello");
        getSystemInfo();
        return new ResponseEntity<>("Hello", HttpStatus.OK);
    }
}
