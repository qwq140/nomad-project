package com.cos.nomadapp.model.tech;

import com.cos.nomadapp.model.file.File;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tech {
    private Long id;
    private String title;
    private File file;
    private boolean isFilter;
    private Timestamp createDate;
}
