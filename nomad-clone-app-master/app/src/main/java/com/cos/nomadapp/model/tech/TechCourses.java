package com.cos.nomadapp.model.tech;

import com.cos.nomadapp.model.courses.Course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TechCourses {
    private long id;
    private Tech tech;
    private Course courses;
}
