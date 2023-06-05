package com.erp.common.service.implementation;

import com.erp.common.exception.ResourceNotFoundException;
import com.erp.common.model.userdata.UserModel;
import com.erp.common.payload.request.UserRequestPayload;
import com.erp.common.payload.response.UserResponsePayload;
import com.erp.common.repository.UserRepository;
import com.erp.common.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImplementation implements UserService {
    Logger logger = LoggerFactory.getLogger(UserServiceImplementation.class);

    @Autowired
    private UserRepository userRepository;

    @Bean
    public ModelMapper userDataModelMapper() {
        return new ModelMapper();
    }

    @Override
    public UserResponsePayload insertUserData(UserRequestPayload userRequestPayload) {
        logger.info("insertUserData method invoked with payload :: " + userRequestPayload);
        UserModel userModel = mapToEntity(userRequestPayload);
        System.out.println("userModel :: " + userModel);
        UserModel newUserModel = userRepository.save(userModel);
        return mapToDto(newUserModel);
    }

    @Override
    public List<UserResponsePayload> findAllUsersByEmail(long userId) {
        logger.info("findAllUsersByEmail method invoked with payload :: " + userId);
        List<UserModel> userModelList = userRepository.getAllUsersByUsersId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("UserModel", "userId", userId));
        return mapToListEntity(userModelList);
    }

    private UserModel mapToEntity(UserRequestPayload userRequestPayload) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(userRequestPayload, UserModel.class);
    }

    private UserResponsePayload mapToDto(UserModel userModel) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(userModel, UserResponsePayload.class);
    }

    private List<UserResponsePayload> mapToListEntity(List<UserModel> userModelList) {
        ModelMapper modelMapper = new ModelMapper();
        return Arrays.asList(modelMapper.map(userModelList, UserResponsePayload[].class));
    }
}
