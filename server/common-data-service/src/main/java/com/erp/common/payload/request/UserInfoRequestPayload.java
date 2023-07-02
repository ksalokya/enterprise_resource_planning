package com.erp.common.payload.request;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoRequestPayload {
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    private String role;
    private String status;
}

