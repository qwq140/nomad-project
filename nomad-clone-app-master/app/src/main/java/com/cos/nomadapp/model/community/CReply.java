package com.cos.nomadapp.model.community;

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
public class CReply implements Serializable {
    private Long id;
    private String content;
    private Integer depth;
    private User user;

    private Community community;
    private Timestamp createDate;
}
