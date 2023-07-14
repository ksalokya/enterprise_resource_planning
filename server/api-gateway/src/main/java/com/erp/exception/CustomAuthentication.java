package com.erp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class CustomAuthentication extends RuntimeException {
    private String path;
    private String error;
    private String info;
    public CustomAuthentication(String path, String error, String info) {
        super(String.format("{ \"timestamp\": \"" + LocalDateTime.now() + "\", \"error\": \"" + error + "\", \"status\": 401 , \"message\": \"" + info + "\", \"path\": \"" + path + "\" }"));
        this.path = path;
        this.error = error;
        this.info = info;
    }

    public String getPath() {
        return path;
    }

    public String getError() {
        return error;
    }

    public String getInfo() {
        return info;
    }
}
