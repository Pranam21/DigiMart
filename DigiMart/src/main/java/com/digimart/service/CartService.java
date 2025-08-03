package com.digimart.service;

import com.digimart.dto.CartDto;

public interface CartService {
    CartDto createCart(Long userId);
    CartDto getCartByUserId(Long userId);
}
