package com.cos.nomadapp.model.community;

import java.io.Serializable;
import java.math.BigInteger;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommunityListRespDto implements Serializable {
    private BigInteger id; //커뮤니티아이디
    private String title;  //커뮤니티제목
    private String categoryTitle;  //카테고리타이틀
    private Timestamp createDate;  // 커뮤니티크리에이트데이트
    private BigInteger userId;     // 유저 userId
    private String name;	       // 유저 name
    private String imageUrl;	   // 유저이미지url
    private BigInteger replyCount; // 커뮤니티 리플리갯수
    private BigInteger likeCount;  // => 어떻게하지?
    private String likeCheck;	   // => 어떻게하지?
}
