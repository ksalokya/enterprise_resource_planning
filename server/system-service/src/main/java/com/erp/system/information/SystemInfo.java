package com.erp.system.information;

import com.erp.system.entity.SystemDetails;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.software.os.OperatingSystem;

public class SystemInfo {
    public synchronized SystemDetails getSystemInfo() {
        SystemDetails systemDetails = new SystemDetails();
        oshi.SystemInfo si = new oshi.SystemInfo();
        HardwareAbstractionLayer hal = si.getHardware();
        OperatingSystem os = si.getOperatingSystem();
        systemDetails.setCpuDetails(hal.getProcessor().getProcessorCpuLoad(3000));
        systemDetails.setMemoryDetails(hal.getMemory());
        systemDetails.setNetworkIFList(hal.getNetworkIFs());
        systemDetails.setDiskStoreList(hal.getDiskStores());
        systemDetails.setOsFamily(os.getFamily());
        systemDetails.setManufacturerDetails(hal.getComputerSystem());
        systemDetails.setCentralProcessor(hal.getProcessor());
        systemDetails.setSensors(hal.getSensors());
        systemDetails.setPowerSourceList(hal.getPowerSources());
        systemDetails.setDisplayList(hal.getDisplays());
        return systemDetails;
    }

}
