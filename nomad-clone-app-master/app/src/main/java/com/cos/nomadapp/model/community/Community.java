package com.cos.nomadapp.model.community;

import com.cos.nomadapp.model.likes.Likes;
import com.cos.nomadapp.model.user.User;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Community implements Serializable {
    private Long id;
    private String title;
    private User user;
    private List<CReply> replys;
    private List<Likes> likes;

    private String content;
    private Integer count;
    private Category category;
    private Timestamp createDate;
}