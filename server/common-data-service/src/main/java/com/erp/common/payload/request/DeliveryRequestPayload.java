package com.erp.common.payload.request;

import lombok.Data;

@Data
public class DeliveryRequestPayload {
    private String code;
    private Integer value;
    private String name;
    private Integer population;
    private Integer density;
    private Integer userId;
}
