package com.digimart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadResponseDto {
    private String fileName;
    private String downloadUrl;
    private String fileType;
    private Long size;
}