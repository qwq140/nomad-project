package com.cos.nomadapp.model.community;

import java.io.Serializable;
import java.math.BigInteger;

import lombok.Data;

@Data
public class CommunityItemRespDto implements Serializable {
    private Community community;
    private BigInteger id;
    private BigInteger likeCount;
    private String likeCheck;
}
