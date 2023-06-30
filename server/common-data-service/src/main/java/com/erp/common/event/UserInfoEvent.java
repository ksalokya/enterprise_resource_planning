package com.erp.common.event;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class UserInfoEvent extends ApplicationEvent {
    private String username;

    public UserInfoEvent(Object source, String username) {
        super(source);
        this.username = username;
    }

    public UserInfoEvent(String username) {
        super(username);
        this.username = username;
    }
}