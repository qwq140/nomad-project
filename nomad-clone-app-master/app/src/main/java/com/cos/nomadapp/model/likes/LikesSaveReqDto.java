package com.cos.nomadapp.model.likes;

import lombok.Data;

@Data
public class LikesSaveReqDto {
    private Long communityId;
    private Long userId;
}
