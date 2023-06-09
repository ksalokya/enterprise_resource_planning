package com.erp.common.payload.request;

import lombok.Data;

@Data
public class OrderRequestPayload {
    private String product;
    private String img;
    private String customerName;
    private String date;
    private long amount;
    private String method;
    private String status;
    private long userId;
}
