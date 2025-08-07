package com.digimart.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadRequestDto {
    private MultipartFile file;
}

