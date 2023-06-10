package com.erp.chartdataservice.payload.request;

import lombok.Data;

@Data
public class MixedStackRequestPayload {
    private String name;
    private Long uv;
    private Long pv;
    private Long value;
    private Long userId;
}
