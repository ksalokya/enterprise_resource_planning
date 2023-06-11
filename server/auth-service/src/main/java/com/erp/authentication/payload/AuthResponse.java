package com.erp.authentication.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private long id;
    private String username;
    private String token;
    private Boolean isLoggedIn;
}
