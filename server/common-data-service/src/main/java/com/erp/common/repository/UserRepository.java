package com.erp.common.repository;

import com.erp.common.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    Optional<List<UserModel>> getAllUsersByEmail(String email);
}
