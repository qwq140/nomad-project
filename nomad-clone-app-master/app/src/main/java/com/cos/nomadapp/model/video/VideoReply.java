package com.cos.nomadapp.model.video;

import com.cos.nomadapp.model.user.User;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class VideoReply {
    private Long id;
    private String content;
    private User user;
    private Video video;
    private Timestamp createDate;
}
