package com.cos.nomadapp.model.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginDto {
    private Long id;
    private String name;
    private String email;
    private String roles;
    private String token;
    private String provider;
}
