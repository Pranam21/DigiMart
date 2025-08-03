package com.digimart.service;


import com.digimart.dto.CartItemDto;

import java.util.List;

public interface CartItemService {
    CartItemDto addItemToCart(CartItemDto cartItemDto);
    void removeItemFromCart(Long cartItemId);
    List<CartItemDto> getItemsByCartId(Long cartId);
}

