package com.erp.chartdataservice.payload.response;

import lombok.Data;

@Data
public class MixedStackResponsePayload {
    private Long id;
    private String name;
    private Long uv;
    private Long pv;
    private Long value;
}
