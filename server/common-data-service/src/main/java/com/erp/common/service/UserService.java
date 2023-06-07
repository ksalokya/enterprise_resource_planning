package com.erp.common.service;

import com.erp.common.payload.request.UserRequestPayload;
import com.erp.common.payload.response.UserResponsePayload;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    UserResponsePayload insertUserData(UserRequestPayload userRequestPayload, MultipartFile file) throws IOException;

    List<UserResponsePayload> findAllUsersByEmail(long userId);

    void updateUser(long id, UserRequestPayload userRequestPayload);

    void deleteUser(long id, long usersId);
}
