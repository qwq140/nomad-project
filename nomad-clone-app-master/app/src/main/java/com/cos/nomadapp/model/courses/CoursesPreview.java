package com.cos.nomadapp.model.courses;

import com.cos.nomadapp.model.tech.Tech;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CoursesPreview implements Serializable {
    private Long id;
    private String title;
    private String subTitle;
    private String level;
    private String price;
    private Long videoId;

    private PreviewImage previewImage;
}
