package com.cos.nomadapp.model.courses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseSection1 {
    private String mainImage;
    private String title;
    private String subTitle;
    private String level;
    private String backgroundColor;
    private String textColor;
}
