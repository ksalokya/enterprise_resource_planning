//package com.erp.common.service.implementation;
//
//import com.erp.common.model.userdata.UserModel;
//import com.erp.common.payload.response.UserResponsePayload;
//import com.erp.common.repository.UserRepository;
//import com.erp.common.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class UserServiceImplementation implements UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public List<UserResponsePayload> findAllUsersByEmail(String email) {
//        // TODO ::  Exception
//        List<UserModel> userModelList = userRepository.getAllUsersByEmail(email).orElseThrow();
//        return mapToModel(userModelList);
//    }
//
//    private List<UserResponsePayload> mapToModel(List<UserModel> userModelList){
//        // TODO :: User model mapper
//        List<UserResponsePayload> userResponsePayloadList = new ArrayList<>();
//        for(UserModel userModel : userModelList){
//            UserResponsePayload userResponsePayload = new UserResponsePayload();
//            userResponsePayload.setId(userModel.getUserData().getId());
//            userResponsePayload.setUsername(userModel.getUserData().getUsername());
//            userResponsePayload.setImg(userModel.getUserData().getImg());
//            userResponsePayload.setStatus(userModel.getUserData().getStatus());
//            userResponsePayload.setEmail(userModel.getUserData().getEmail());
//            userResponsePayload.setAge(userModel.getUserData().getAge());
//            userResponsePayload.setContact(userModel.getUserData().getContact());
//            userResponsePayloadList.add(userResponsePayload);
//        }
//        return userResponsePayloadList;
//    }
//}
