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
    private long id;
    private String username;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private String image;
    private String status;
    private String email;
    private String age;
    private String contact;
    private long userId;
}
