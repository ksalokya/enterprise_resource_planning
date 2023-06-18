package com.erp.common.payload.request;

import lombok.Data;

@Data
public class DeliveryRequestPayload {
    private String code;
    private long value;
    private String name;
    private long population;
    private long density;
    private long userId;
}
