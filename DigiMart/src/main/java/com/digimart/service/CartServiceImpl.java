package com.digimart.service;


import com.digimart.dto.CartDto;
import com.digimart.entities.Cart;
import com.digimart.entities.User;
import com.digimart.Repository.*;
import com.digimart.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CartDto createCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = new Cart();
        cart.setUser(user);

        Cart saved = cartRepository.save(cart);
        return modelMapper.map(saved, CartDto.class);
    }

    @Override
    public CartDto getCartByUserId(Long userId) {
        Cart cart = cartRepository.findAll()
                .stream()
                .filter(c -> c.getUser().getId().equals(userId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart not found for user"));

        return modelMapper.map(cart, CartDto.class);
    }
}
