package com.erp.common.payload.response;

import lombok.Data;

@Data
public class UserResponsePayload {
    private long id;
    private String username;
    private String img;
    private String status;
    private String email;
    private String age;
    private String contact;
}
