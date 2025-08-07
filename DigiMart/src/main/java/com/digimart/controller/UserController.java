package com.digimart.controller;



import com.digimart.entities.*;
import com.digimart.dto.*;
import com.digimart.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // allow all origins (optional for frontend testing)
public class UserController {

    @Autowired
    private UserService userService;

    

    // ✅ API: Get user details by email
    @GetMapping("/{email}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        UserDto user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }
}

