package com.erp.chartdataservice.payload.request;

import lombok.Data;

@Data
public class BarChartRequestPayload {
    private Long cp;
    private Long sp;
    private Long amt;
    private Long userId;
}
