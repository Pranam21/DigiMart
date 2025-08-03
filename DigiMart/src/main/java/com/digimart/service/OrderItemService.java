package com.digimart.service;


import com.digimart.dto.OrderItemDto;

import java.util.List;

public interface OrderItemService {
    OrderItemDto addOrderItem(OrderItemDto dto);
    List<OrderItemDto> getOrderItemsByOrderId(Long orderId);
}
