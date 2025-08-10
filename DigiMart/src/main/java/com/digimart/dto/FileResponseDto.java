package com.digimart.dto;

//com.digimart.dto.FileResponseDto
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FileResponseDto {
 private Long id;
 private String title;          // map from original filename if you don’t have productName yet
 private String uploadedBy;     // uploader email
 private String fileType;       // MIME
 private Long size;             // bytes
 private String downloadUrl;    // /api/files/download/{id}
 private Double price;         // if not yet stored, set null or 0
 private boolean owned;         // uploader or purchased
}
