package com.erp.common.service;

import com.erp.common.payload.request.UserRequestPayload;
import com.erp.common.payload.response.UserInfoResponsePayload;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    UserInfoResponsePayload insertUserData(UserRequestPayload userRequestPayload, MultipartFile file);

    List<UserInfoResponsePayload> findAllUsersByEmail(long userId);

    void updateUser(long id, UserRequestPayload userRequestPayload, MultipartFile file);

    void updateUserWithOutImage(long id, UserRequestPayload userRequestPayload);

    void deleteUser(long id, long userId);
}
