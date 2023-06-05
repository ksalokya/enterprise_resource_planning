package com.erp.common.repository;

import com.erp.common.model.userdata.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    Optional<List<UserModel>> getAllUsersByUsersId(long userId);
}
