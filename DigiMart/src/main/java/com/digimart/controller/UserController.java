package com.digimart.controller;



import com.digimart.entities.*;
import com.digimart.dto.*;
import com.digimart.service.*;

import lombok.RequiredArgsConstructor;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // allow all origins (optional for frontend testing)
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;
    
    private final UserCrudService svc;
    

    // ✅ API: Get user details by email
    @GetMapping("/{email}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        UserDto user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/me")
    public UserDto me(@AuthenticationPrincipal UserDetails principal) {
        return svc.me(principal.getUsername());
    }

    @PutMapping("/me")
    public UserDto updateMe(@AuthenticationPrincipal UserDetails principal,
                            @Valid @RequestBody UserSelfUpdateDto dto) {
        return svc.updateMe(principal.getUsername(), dto);
    }

    @PutMapping("/me/password")
    public void changePassword(@AuthenticationPrincipal UserDetails principal,
                               @Valid @RequestBody PasswordChangeDto dto) {
        svc.changeMyPassword(principal.getUsername(), dto);
    }
}

