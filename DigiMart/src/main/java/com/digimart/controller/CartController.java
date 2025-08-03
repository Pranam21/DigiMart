package com.digimart.controller;



import com.digimart.dto.CartDto;
import com.digimart.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    // Create a new cart for a user
    @PostMapping("/create/{userId}")
    public ResponseEntity<CartDto> createCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.createCart(userId));
    }

    // Get cart by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<CartDto> getCartByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }
}
