package com.erp.common.service.implementation;

import com.erp.common.exception.ResourceNotFoundException;
import com.erp.common.model.UserModel;
import com.erp.common.payload.request.UserInfoRequestPayload;
import com.erp.common.payload.request.UserRequestPayload;
import com.erp.common.payload.response.UserResponsePayload;
import com.erp.common.repository.UserRepository;
import com.erp.common.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImplementation implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WebClient webClient;

    @Override
    public UserResponsePayload insertUserData(UserRequestPayload userRequestPayload, MultipartFile file) {
        UserInfoRequestPayload userInfoRequestPayload = UserInfoRequestPayload.builder()
                .name(userRequestPayload.getUsername())
                .email(userRequestPayload.getEmail())
                .password("defaultpassword")
                .role("USER")
                .status("NEW")
                .build();

        // Call Auth Service to save User's Detail
        Boolean result = webClient.post()
                .uri("http://localhost:8002/api/v1/auth/new")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(userInfoRequestPayload))
                .retrieve()
                .bodyToMono(Boolean.class)
                .block();

        if (Boolean.TRUE.equals(result)) {
            UserModel userModel = mapToEntity(userRequestPayload, file);
            UserModel insertedUserModel = userRepository.save(userModel);
            return mapToDto(insertedUserModel);
        } else {
            throw new IllegalArgumentException("Unable to create user");
        }
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
