package com.erp.chartdataservice.payload.response;

import lombok.Data;

@Data
public class BarChartResponsePayload {
    private Long id;
    private Long cp;
    private Long sp;
    private Long amt;
}
