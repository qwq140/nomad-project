package com.cos.nomadapp.model.video;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VideoContent implements Serializable {
    private String title;
    private boolean isFree;
    private String vimeoId;
}
