package com.digimart.dto;



import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Long categoryId;
    private Long sellerId;
    private String fileUrl;
    private String uploadDate;
}
