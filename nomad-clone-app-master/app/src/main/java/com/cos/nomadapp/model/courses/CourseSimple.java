package com.cos.nomadapp.model.courses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseSimple {
    private String simpleImage;
    private String title;
    private String content;
}
