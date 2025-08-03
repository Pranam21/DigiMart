package com.digimart.service;


import com.digimart.dto.OrderItemDto;
import com.digimart.entities.Order;
import com.digimart.entities.OrderItem;
import com.digimart.entities.Product;
import com.digimart.Repository.*;

import com.digimart.service.*;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public OrderItemDto addOrderItem(OrderItemDto dto) {
        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        OrderItem item = new OrderItem();
        item.setOrderId(order);
        item.setProductId(product);
        item.setPriceAtPurchase(dto.getPriceAtPurchase());

        OrderItem saved = orderItemRepository.save(item);
        return modelMapper.map(saved, OrderItemDto.class);
    }

    @Override
    public List<OrderItemDto> getOrderItemsByOrderId(Long orderId) {
        return orderItemRepository.findAll().stream()
                .filter(item -> item.getOrderId().getId().equals(orderId))
                .map(item -> modelMapper.map(item, OrderItemDto.class))
                .collect(Collectors.toList());
    }
}
