package com.cos.nomadapp.model.community;



import com.cos.nomadapp.model.user.User;

import lombok.Data;

@Data
public class CReplySaveReqDto {
    private String content;
    private Long comId;
}
