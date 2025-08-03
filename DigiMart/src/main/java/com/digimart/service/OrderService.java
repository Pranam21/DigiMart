package com.digimart.service;


import com.digimart.dto.OrderDto;
import java.util.List;

public interface OrderService {
    OrderDto placeOrder(OrderDto orderDto);
    List<OrderDto> getAllOrders();
    OrderDto getOrderById(Long id);
    void deleteOrder(Long id);
}
