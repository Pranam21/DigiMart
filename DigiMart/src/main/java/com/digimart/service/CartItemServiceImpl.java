package com.digimart.service;



import com.digimart.dto.CartItemDto;
import com.digimart.entities.Cart;
import com.digimart.entities.CartItem;
import com.digimart.entities.Product;
import com.digimart.Repository.*;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CartItemDto addItemToCart(CartItemDto dto) {
        Cart cart = cartRepository.findById(dto.getCartId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);

        CartItem saved = cartItemRepository.save(item);
        return modelMapper.map(saved, CartItemDto.class);
    }

    @Override
    public void removeItemFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public List<CartItemDto> getItemsByCartId(Long cartId) {
        return cartItemRepository.findAll().stream()
                .filter(item -> item.getCart().getId().equals(cartId))
                .map(item -> modelMapper.map(item, CartItemDto.class))
                .collect(Collectors.toList());
    }
}
