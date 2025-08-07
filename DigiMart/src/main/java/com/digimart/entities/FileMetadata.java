package com.digimart.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "file_metadata")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileMetadata extends BaseEntity {

    private String fileName;

    private String originalFileName;

    private String fileType;

    private Long fileSize;

    private String downloadUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by")
    private User uploadedBy;
}