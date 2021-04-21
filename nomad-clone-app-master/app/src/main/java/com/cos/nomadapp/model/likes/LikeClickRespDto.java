package com.cos.nomadapp.model.likes;

import java.math.BigInteger;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LikeClickRespDto {
    private BigInteger id;
    private BigInteger likeCount;
    private String likeCheck;
}
