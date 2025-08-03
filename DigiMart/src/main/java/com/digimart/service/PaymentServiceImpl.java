package com.digimart.service;



import com.digimart.dto.PaymentDto;
import com.digimart.entities.Order;
import com.digimart.entities.Payment;
import com.digimart.entities.*;
import com.digimart.Repository.*;

import com.digimart.service.*;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public PaymentDto makePayment(PaymentDto dto) {
        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Payment payment = new Payment();
        payment.setOrderId(order);
        payment.setPaymentDate(LocalDate.now());
        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setPaymentStatus(Status.valueOf(dto.getPaymentStatus()));
        payment.setTransactionReference(dto.getTransactionReference());

        Payment saved = paymentRepository.save(payment);
        return modelMapper.map(saved, PaymentDto.class);
    }

    @Override
    public PaymentDto getPaymentByOrderId(Long orderId) {
        Payment payment = paymentRepository.findAll().stream()
                .filter(p -> p.getOrderId().getId().equals(orderId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Payment not found for this order"));
        return modelMapper.map(payment, PaymentDto.class);
    }

    @Override
    public List<PaymentDto> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(p -> modelMapper.map(p, PaymentDto.class))
                .collect(Collectors.toList());
    }
}
