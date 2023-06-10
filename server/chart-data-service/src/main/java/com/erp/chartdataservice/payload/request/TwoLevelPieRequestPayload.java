package com.erp.chartdataservice.payload.request;

import lombok.Data;

@Data
public class TwoLevelPieRequestPayload {
    private String name;
    private Long value;
    private String type;
    private Long userId;
}
