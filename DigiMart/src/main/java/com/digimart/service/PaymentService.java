package com.digimart.service;


import com.digimart.dto.PaymentDto;
import java.util.List;

public interface PaymentService {
    PaymentDto makePayment(PaymentDto dto);
    PaymentDto getPaymentByOrderId(Long orderId);
    List<PaymentDto> getAllPayments();
}
