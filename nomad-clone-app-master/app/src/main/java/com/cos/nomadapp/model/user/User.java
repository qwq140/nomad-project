package com.cos.nomadapp.model.user;

import java.io.Serializable;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements Serializable {
    private Long id;
    private String username;
    private String name;
    private String email;
    private String roles;
    private String provider;
    private String imageUrl;
    private Timestamp createDate;
}
