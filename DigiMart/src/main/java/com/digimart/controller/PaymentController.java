package com.digimart.controller;



import com.digimart.dto.PaymentDto;
import com.digimart.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<PaymentDto> makePayment(@RequestBody PaymentDto dto) {
        return ResponseEntity.ok(paymentService.makePayment(dto));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<PaymentDto> getPaymentByOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(paymentService.getPaymentByOrderId(orderId));
    }

    @GetMapping
    public ResponseEntity<List<PaymentDto>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }
}
