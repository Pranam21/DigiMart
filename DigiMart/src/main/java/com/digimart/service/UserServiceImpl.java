package com.digimart.service;



import java.util.Optional;


import com.digimart.entities.*;
import com.digimart.entities.Role;
import com.digimart.entities.User;
import com.digimart.dto.*;
import com.digimart.Repository.UserRepository;
import com.digimart.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDto registerUser(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword()); // 🔒 In real app, encrypt this
        user.setRole(Role.valueOf(userDto.getRole()));
        user.setRegistrationDate(LocalDate.now());

        User savedUser = userRepository.save(user);

        return new UserDto(
            savedUser.getId(),
            savedUser.getUsername(),
            savedUser.getEmail(),
            null, // password is hidden in response
            savedUser.getRole().name(),
            savedUser.getRegistrationDate().toString()
        );
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
        		.orElseThrow(()-> new RuntimeException("User not found with email: " + email));
        		
            //orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        return new UserDto(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            null,
            user.getRole().name(),
            user.getRegistrationDate().toString()
        );
    }
}
