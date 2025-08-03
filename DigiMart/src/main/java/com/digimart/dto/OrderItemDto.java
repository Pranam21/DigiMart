package com.digimart.dto;



import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDto {
    private Long id;
    private Long orderId;
    private Long productId;
    private Double priceAtPurchase;
}
