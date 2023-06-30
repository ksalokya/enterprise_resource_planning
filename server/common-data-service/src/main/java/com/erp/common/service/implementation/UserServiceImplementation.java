package com.erp.common.service.implementation;

import com.erp.common.event.UserInfoEvent;
import com.erp.common.exception.ResourceNotFoundException;
import com.erp.common.model.UserModel;
import com.erp.common.payload.request.UserInfoRequestPayload;
import com.erp.common.payload.request.UserRequestPayload;
import com.erp.common.payload.response.UserInfoResponsePayload;
import com.erp.common.repository.UserRepository;
import com.erp.common.service.UserService;
import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
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
    private WebClient.Builder webClientBuilder;

    @Autowired
    private ObservationRegistry observationRegistry;

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @Override
    public String insertUserData(UserRequestPayload userRequestPayload, MultipartFile file) {
        UserInfoRequestPayload userInfoRequestPayload = UserInfoRequestPayload.builder()
                .name(userRequestPayload.getUsername())
                .email(userRequestPayload.getEmail())
                .password("defaultpassword")
                .role("USER")
                .status("NEW")
                .build();

        Observation authServiceObservation = Observation.createNotStarted("auth-service-lookup",
                this.observationRegistry);
        authServiceObservation.lowCardinalityKeyValue("call", "auth-service");

        // Call Auth Service to save User's Detail
        return authServiceObservation.observe(() -> {
            String result = webClientBuilder.build().post()
                    .uri("http://auth-service/api/v1/auth/new")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(userInfoRequestPayload))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            if (Objects.equals(result, "User registered successfully")) {
                UserModel userModel = mapToEntity(userRequestPayload, file);
                userRepository.save(userModel);
                return "User registered successfully";
            } else {
                throw new IllegalArgumentException("Unable to create user");
            }
        });
    }

    @Override
    public List<UserInfoResponsePayload> findAllUsersByEmail(long userId) {
        List<UserModel> userModelList = userRepository.findAllByAdminId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("UserModel", "userId", userId));
        return mapToListEntity(userModelList);
    }

    @Override
    public String updateUser(long id, UserRequestPayload userRequestPayload, MultipartFile file) {
        userRepository.saveByIdAndAdminId(id, userRequestPayload.getUsername(),
                convertImage(file), userRequestPayload.getStatus(),
                userRequestPayload.getEmail(), userRequestPayload.getAge(),
                userRequestPayload.getContact(), userRequestPayload.getAdminId());
        applicationEventPublisher.publishEvent(new UserInfoEvent(this, userRequestPayload.getUsername()));
        return "User updated successfully";
    }

    @Override
    public void updateUserWithOutImage(long id, UserRequestPayload userRequestPayload) {
        userRepository.saveByIdAndAdminIdWithOutImage(id, userRequestPayload.getUsername(),
                userRequestPayload.getStatus(), userRequestPayload.getEmail(), userRequestPayload.getAge(),
                userRequestPayload.getContact(), userRequestPayload.getAdminId());
    }

    @Override
    public void deleteUser(long id, long userId) {
        // TODO :: Add Auth call to mark status as DELETED
        userRepository.removeByIdAndAdminId(id, userId);
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
        userModel.setAdminId(userRequestPayload.getAdminId());
        return userModel;
    }

    private UserInfoResponsePayload mapToDto(UserModel userModel) {
        UserInfoResponsePayload userInfoResponsePayload = new UserInfoResponsePayload();
        userInfoResponsePayload.setId(userModel.getId());
        userInfoResponsePayload.setUsername(userModel.getUsername());
        userInfoResponsePayload.setImage(userModel.getImage());
        userInfoResponsePayload.setStatus(userModel.getStatus());
        userInfoResponsePayload.setEmail(userModel.getEmail());
        userInfoResponsePayload.setAge(userModel.getAge());
        userInfoResponsePayload.setContact(userModel.getContact());
        return userInfoResponsePayload;
    }

    private List<UserInfoResponsePayload> mapToListEntity(List<UserModel> userModelList) {
        List<UserInfoResponsePayload> userInfoResponsePayloadList = new ArrayList<>();
        for (UserModel userModel : userModelList) {
            userInfoResponsePayloadList.add(mapToDto(userModel));
        }
        return userInfoResponsePayloadList;
    }
}
