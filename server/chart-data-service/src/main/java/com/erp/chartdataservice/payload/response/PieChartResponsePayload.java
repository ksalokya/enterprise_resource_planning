package com.erp.chartdataservice.payload.response;

import lombok.Data;

@Data
public class PieChartResponsePayload {
    private Long id;
    private String name;
    private Long value;
}
