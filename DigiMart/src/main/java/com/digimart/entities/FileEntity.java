// src/main/java/com/digimart/entities/FileEntity.java
package com.digimart.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "files")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileEntity extends BaseEntity {

    


    private String title;

    private String description;

    private String filename;

    private String fileType;

    private Double price;
    
    @Column(name = "file_size")
    private Long fileSize; // in bytes

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploader_id")
    private User uploader;
}
