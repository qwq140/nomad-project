package com.cos.nomadapp.model.courses;

import com.cos.nomadapp.model.video.VideoContent;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Curriculum {
    private String chapter;
    private List<VideoContent> contents;
}
