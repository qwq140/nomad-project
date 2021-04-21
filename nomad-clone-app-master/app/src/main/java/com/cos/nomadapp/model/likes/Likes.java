package com.cos.nomadapp.model.likes;

import com.cos.nomadapp.model.community.Community;
import com.cos.nomadapp.model.user.User;

import java.io.Serializable;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Likes implements Serializable {
    private long id;
    private Community community;
    private User user;
    private Timestamp createDate;
}