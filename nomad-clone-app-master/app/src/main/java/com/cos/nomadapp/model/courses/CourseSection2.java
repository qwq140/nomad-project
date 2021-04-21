package com.cos.nomadapp.model.courses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseSection2 {
    private String videoCount;
    private String videoMinute;
    private String level;

}
