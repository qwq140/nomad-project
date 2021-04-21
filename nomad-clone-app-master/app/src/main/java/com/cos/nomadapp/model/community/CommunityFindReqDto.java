package com.cos.nomadapp.model.community;

import java.io.Serializable;

import lombok.Data;

@Data
public class CommunityFindReqDto implements Serializable{
    private String sort;
    private long categoryId;
}
