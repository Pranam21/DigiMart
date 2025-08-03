package com.digimart.controller;


import com.digimart.dto.CartItemDto;
import com.digimart.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart-items")
@CrossOrigin(origins = "*")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @PostMapping
    public ResponseEntity<CartItemDto> addItemToCart(@RequestBody CartItemDto dto) {
        return ResponseEntity.ok(cartItemService.addItemToCart(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeItem(@PathVariable Long id) {
        cartItemService.removeItemFromCart(id);
        return ResponseEntity.ok("Cart item removed successfully.");
    }

    @GetMapping("/cart/{cartId}")
    public ResponseEntity<List<CartItemDto>> getItemsByCartId(@PathVariable Long cartId) {
        return ResponseEntity.ok(cartItemService.getItemsByCartId(cartId));
    }
}
