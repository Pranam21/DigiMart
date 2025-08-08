package com.digimart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileResponseDto {
    private Long id;
    private String title;              // original file name
    private String fileType;
    private Long size;                // in bytes
    private String uploadedBy;        // email or username
    private Double price;
    private String downloadUrl;       // optional, returned only if user has access
    private boolean owned;            // true if purchased or uploaded by current user
}
