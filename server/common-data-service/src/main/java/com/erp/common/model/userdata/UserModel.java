package com.erp.common.model.userdata;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "userdata")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String image;
    private String status;
    private String email;
    private String age;
    private String contact;
    private Integer userId;
}
