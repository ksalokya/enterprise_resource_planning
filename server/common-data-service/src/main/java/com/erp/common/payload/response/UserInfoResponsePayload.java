package com.erp.common.payload.response;

import lombok.Data;

@Data
public class UserInfoResponsePayload {
    private long id;
    private String username;
    private String image;
    private String status;
    private String email;
    private String age;
    private String contact;
}
