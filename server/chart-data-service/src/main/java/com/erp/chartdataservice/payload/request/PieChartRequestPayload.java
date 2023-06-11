package com.erp.chartdataservice.payload.request;

import lombok.Data;

@Data
public class PieChartRequestPayload {
    private String name;
    private Long value;
    private Long userId;
}
