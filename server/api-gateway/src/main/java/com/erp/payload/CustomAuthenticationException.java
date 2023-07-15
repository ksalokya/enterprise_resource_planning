package com.erp.payload;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class CustomAuthenticationException {

    private LocalDateTime localDateTime;
    private String error;
    private HttpStatus status;
    private String info;
    private String path;


    public CustomAuthenticationException(String path, String error, String info) {
        this.localDateTime = LocalDateTime.now();
        this.error = error;
        this.path = path;
        this.status = HttpStatus.UNAUTHORIZED;
        this.info = info;
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public String getError() {
        return error;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getInfo() {
        return info;
    }

    public String getPath() {
        return path;
    }
}
