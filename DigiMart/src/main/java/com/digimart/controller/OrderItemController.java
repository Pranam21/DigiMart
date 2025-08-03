package com.digimart.controller;



import com.digimart.dto.OrderItemDto;
import com.digimart.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-items")
@CrossOrigin(origins = "*")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping
    public ResponseEntity<OrderItemDto> addItem(@RequestBody OrderItemDto dto) {
        return ResponseEntity.ok(orderItemService.addOrderItem(dto));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderItemDto>> getItems(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderItemService.getOrderItemsByOrderId(orderId));
    }
}
