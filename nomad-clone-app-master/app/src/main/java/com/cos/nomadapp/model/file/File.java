package com.cos.nomadapp.model.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class File {
    private Long id;
    private String fileName;
    private String fileOriName;
    private String imageFilePath;
    private String fileUrl;
}
