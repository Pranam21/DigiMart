package com.digimart.service;


import com.digimart.dto.OrderDto;
import com.digimart.entities.Order;
import com.digimart.entities.User;
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
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public OrderDto placeOrder(OrderDto dto) {
        User customer = userRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Order order = new Order();
        order.setCustomerId(customer);
        order.setOrderDate(LocalDate.now());
        order.setTotalAmount(dto.getTotalAmount());
        order.setOrderStatus(Status.valueOf(dto.getOrderStatus()));
        order.setPaymentStatus(Status.valueOf(dto.getPaymentStatus()));

        Order saved = orderRepository.save(order);
        return modelMapper.map(saved, OrderDto.class);
    }

    @Override
    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(order -> modelMapper.map(order, OrderDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public OrderDto getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return modelMapper.map(order, OrderDto.class);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
