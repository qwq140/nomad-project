package com.cos.nomadapp.model.courses;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Concept {
    private String title;
    private List<String> contents;
}
