package com.digimart.dto;



import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {
    private Long id;
    private Long cartId;
    private Long productId;
}
