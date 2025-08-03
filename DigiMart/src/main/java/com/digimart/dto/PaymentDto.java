package com.digimart.dto;



import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
    private Long id;
    private Long orderId;
    private String paymentDate;
    private Double amount;
    private String paymentMethod;
    private String paymentStatus;
    private String transactionReference;
}
