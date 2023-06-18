package com.erp.common.payload.response;

import lombok.Data;

@Data
public class OrderResponsePayload {
    private long id;
    private String product;
    private String img;
    private String customerName;
    private String date;
    private long amount;
    private String method;
    private String status;
}
