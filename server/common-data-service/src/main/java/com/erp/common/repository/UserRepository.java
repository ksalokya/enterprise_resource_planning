package com.erp.common.repository;

import com.erp.common.model.UserModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    Optional<List<UserModel>> findAllByAdminId(long adminId);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("update UserModel u set u.username = :username, u.image = :image, u.status = :status, u.email = :email, u.age = :age, u.contact = :contact where u.id = :id and u.adminId = :adminId")
    void saveByIdAndAdminId(@Param("id") long id,
                            @Param("username") String username, @Param("image") String image,
                            @Param("status") String status, @Param("email") String email,
                            @Param("age") String age, @Param("contact") String contact,
                            @Param("adminId") long adminId);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("update UserModel u set u.username = :username, u.status = :status, u.email = :email, u.age = :age, u.contact = :contact where u.id = :id and u.adminId = :adminId")
    void saveByIdAndAdminIdWithOutImage(@Param("id") long id,
                                        @Param("username") String username,
                                        @Param("status") String status, @Param("email") String email,
                                        @Param("age") String age, @Param("contact") String contact,
                                        @Param("adminId") long adminId);

    @Transactional
    void removeByIdAndAdminId(long id, long adminId);
}
