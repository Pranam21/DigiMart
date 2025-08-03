package com.digimart.dto;



import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private Long customerId;
    private String orderDate;
    private Double totalAmount;
    private String orderStatus;
    private String paymentStatus;
}
