package com.erp.common.service;

import com.erp.common.payload.request.UserRequestPayload;
import com.erp.common.payload.response.UserResponsePayload;

import java.util.List;

public interface UserService {
    UserResponsePayload insertUserData(UserRequestPayload userRequestPayload);

    List<UserResponsePayload> findAllUsersByEmail(long userId);

    void updateUser(long id, UserRequestPayload userRequestPayload);

    void deleteUser(long id, long usersId);
}
