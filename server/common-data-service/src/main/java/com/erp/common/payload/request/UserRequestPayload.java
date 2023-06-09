package com.erp.common.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserRequestPayload {
    private String username;
    private String status;
    private String email;
    private String age;
    private String contact;
    private long userId;
}
