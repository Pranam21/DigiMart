package com.digimart.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digimart.dto.LoginDto;
import com.digimart.dto.UserDto;
import com.digimart.security.JwtService;

import com.digimart.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto userDto) {
        UserDto registered = userService.registerUser(userDto);
        return ResponseEntity.ok(registered);
    }

//    @PostMapping("/login")
//    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDto loginDto) {
//    	System.out.println("Login attempt for: " + loginDto.getEmail());
//    	
//    	UserDto found = userService.getUserByEmail(loginDto.getEmail());
//    	
//    	if (found != null) {
//            System.out.println("Raw password: " + loginDto.getPassword());
//            System.out.println("Stored hash: " + found.getPassword());
//            System.out.println("Password match: " +
//                passwordEncoder.matches(loginDto.getPassword(), found.getPassword()));
//    	} 
//            
//        if (found == null || found.getPassword() == null ||
//                !passwordEncoder.matches(loginDto.getPassword(), found.getPassword())) {
//                return ResponseEntity.status(401).body(Collections.singletonMap("error", "Invalid credentials"));
//        }
//
//        String token = jwtUtil.generateToken(found.getEmail(), Collections.singletonList(found.getRoles()));
//        return ResponseEntity.ok(Collections.singletonMap("token", token));
//    }
    
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginDto.getEmail(),
                    loginDto.getPassword()
                )
            );

            UserDto found = userService.getUserByEmail(loginDto.getEmail());

            String token = jwtService.generateToken(
                found.getEmail(),
                Collections.singletonList(found.getRoles().name())
            );

            return ResponseEntity.ok(Map.of("token", token, "role", found.getRoles().name()));
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).body(Collections.singletonMap("error", "Invalid credentials"));
        }
    }

    

//    @PostMapping("/admin/login")
//    public ResponseEntity<String> adminLogin(@RequestBody LoginDto loginDto) {
//        UserDto found = userService.getUserByEmail(loginDto.getEmail());
//        if (found.getPassword() == null || !found.getPassword().equals(loginDto.getPassword()) || !"ADMIN".equals(found.getRoles())) {
//            return ResponseEntity.status(403).body("Access Denied");
//        }
//
//        String token = jwtUtil.generateToken(found.getEmail(), Collections.singletonList(found.getRoles()));
//        return ResponseEntity.ok(token);
    

}