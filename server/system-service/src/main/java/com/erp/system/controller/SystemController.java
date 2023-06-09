package com.erp.system.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import oshi.SystemInfo;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.software.os.OperatingSystem;

import java.util.Arrays;

@RestController
@RequestMapping("/api/v1/os")
public class SystemController {

    public static synchronized void getSystemInfo() {
        SystemInfo si = new SystemInfo();
        HardwareAbstractionLayer hal = si.getHardware();
        OperatingSystem os = si.getOperatingSystem();

//        System.out.println("CPU :: " + Arrays.toString(hal.getProcessor().getProcessorCpuLoad(3000)));
//        System.out.println("Memory :: " + hal.getMemory());
//        System.out.println("Traffic :: " + hal.getNetworkIFs());
//        System.out.println("Disk :: " + hal.getDiskStores());
//        System.out.println(os.getFamily());
//        System.out.println(hal.getComputerSystem());
//        System.out.println(hal.getProcessor());
//        System.out.println(hal.getMemory());
//        System.out.println(hal.getProcessor());
//        System.out.println(os, hal.getMemory());
//        System.out.println(hal.getSensors());
//        System.out.println(hal.getPowerSources());
//        System.out.println(hal.getDiskStores());
//        System.out.println(os.getFileSystem());
//        System.out.println(hal.getNetworkIFs());
//        System.out.println(os.getNetworkParams());
//        System.out.println(hal.getDisplays());
    }

    @GetMapping("/get")
    public ResponseEntity<?> getOsInfo() {
        getSystemInfo();
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
