package com.erp.system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import oshi.hardware.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SystemDetails {
    double[] cpuDetails;
    GlobalMemory memoryDetails;
    List<NetworkIF> networkIFList;
    List<HWDiskStore> diskStoreList;
    String osFamily;
    ComputerSystem manufacturerDetails;
    CentralProcessor centralProcessor;
    Sensors sensors;
    List<PowerSource> powerSourceList;
    List<Display> displayList;
}
