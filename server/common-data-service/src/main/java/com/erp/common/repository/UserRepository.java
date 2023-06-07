package com.erp.common.repository;

import com.erp.common.model.userdata.UserModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    Optional<List<UserModel>> getAllUsersByUserId(long userId);

//    @Transactional
//    @Modifying(clearAutomatically = true, flushAutomatically = true)
//    @Query("update UserModel u set u.username = :username, u.img = :img, u.status = :status, u.email = :email, u.age = :age, u.contact = :contact where u.id = :id and u.userId = :userId")
//    void saveByIdAndUserId(@Param("id") long id,
//                           @Param("username") String username, @Param("img") String img,
//                           @Param("status") String status, @Param("email") String email,
//                           @Param("age") String age, @Param("contact") String contact,
//                           @Param("userId") long userId);

    @Transactional
    void removeByIdAndUserId(long id, long userId);
}
