// FileListItemDto.java
package com.digimart.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FileListItemDto {
    private Long id;
    private String originalFilename;
    private String uploaderEmail;
    private Long size;
    private String fileType;
    private boolean canDownload;
    // Optional: price/product fields if you have them later
    // private BigDecimal price;
    // private String productName;
}
