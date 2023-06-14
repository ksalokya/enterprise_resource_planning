package com.erp.common.service.implementation;

import com.erp.common.exception.ResourceNotFoundException;
import com.erp.common.model.UserModel;
import com.erp.common.payload.request.UserRequestPayload;
import com.erp.common.payload.response.UserResponsePayload;
import com.erp.common.repository.UserRepository;
import com.erp.common.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImplementation implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserResponsePayload insertUserData(UserRequestPayload userRequestPayload, MultipartFile file) {
        UserModel userModel = mapToEntity(userRequestPayload, file);
        UserModel insertedUserModel = userRepository.save(userModel);
        return mapToDto(insertedUserModel);
    }

    @Override
    public List<UserResponsePayload> findAllUsersByEmail(long userId) {
        List<UserModel> userModelList = userRepository.findAllByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("UserModel", "userId", userId));
        return mapToListEntity(userModelList);
    }

    @Override
    public void updateUser(long id, UserRequestPayload userRequestPayload, MultipartFile file) {
        userRepository.saveByIdAndUserId(id, userRequestPayload.getUsername(),
                convertImage(file), userRequestPayload.getStatus(),
                userRequestPayload.getEmail(), userRequestPayload.getAge(),
                userRequestPayload.getContact(), userRequestPayload.getUserId());
    }

    @Override
    public void updateUserWithOutImage(long id, UserRequestPayload userRequestPayload) {
        userRepository.saveByIdAndUserIdWithOutImage(id, userRequestPayload.getUsername(),
                userRequestPayload.getStatus(), userRequestPayload.getEmail(), userRequestPayload.getAge(),
                userRequestPayload.getContact(), userRequestPayload.getUserId());
    }

    @Override
    public void deleteUser(long id, long userId) {
        userRepository.removeByIdAndUserId(id, userId);
    }

    private String convertImage(MultipartFile file) {
        String image = "";
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        if (fileName.contains("..")) {
            System.out.println("Not a valid file");
        }
        try {
            image = Base64.getEncoder().encodeToString(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return image;
    }

    private UserModel mapToEntity(UserRequestPayload userRequestPayload, MultipartFile file) {
        UserModel userModel = new UserModel();
        userModel.setUsername(userRequestPayload.getUsername());
        userModel.setImage(convertImage(file));
        userModel.setStatus(userRequestPayload.getStatus());
        userModel.setEmail(userRequestPayload.getEmail());
        userModel.setAge(userRequestPayload.getAge());
        userModel.setContact(userRequestPayload.getContact());
        userModel.setUserId(userRequestPayload.getUserId());
        return userModel;
    }

    private UserResponsePayload mapToDto(UserModel userModel) {
        UserResponsePayload userResponsePayload = new UserResponsePayload();
        userResponsePayload.setId(userModel.getId());
        userResponsePayload.setUsername(userModel.getUsername());
        userResponsePayload.setImage(userModel.getImage());
        userResponsePayload.setStatus(userModel.getStatus());
        userResponsePayload.setEmail(userModel.getEmail());
        userResponsePayload.setAge(userModel.getAge());
        userResponsePayload.setContact(userModel.getContact());
        return userResponsePayload;
    }

    private List<UserResponsePayload> mapToListEntity(List<UserModel> userModelList) {
        List<UserResponsePayload> userResponsePayloadList = new ArrayList<>();
        for (UserModel userModel : userModelList) {
            userResponsePayloadList.add(mapToDto(userModel));
        }
        return userResponsePayloadList;
    }
}
