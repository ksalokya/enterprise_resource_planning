package com.erp.common.payload.response;

import lombok.Data;

@Data
public class DeliveryResponsePayload {
    private String code;
    private Integer value;
    private String name;
    private Integer population;
    private Integer density;
}
