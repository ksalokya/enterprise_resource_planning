package com.erp.common.payload.response;

import lombok.Data;

@Data
public class DeliveryResponsePayload {
    private long id;
    private String code;
    private long value;
    private String name;
    private long population;
    private long density;
}
