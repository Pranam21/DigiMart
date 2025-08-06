package com.digimart.service;

import com.digimart.Repository.UserRepository;
import com.digimart.dto.UserDto;
import com.digimart.entities.Role;
import com.digimart.entities.User;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
		this.modelMapper = new ModelMapper();
    }

    @Override
    public UserDto registerUser(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRegistrationDate(LocalDate.now());
        user.setRoles(Role.USER); // Set default role as USER

        User savedUser = userRepository.save(user);

        return new UserDto(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                null, // Do not expose password in response
                Role.USER,
                savedUser.getRegistrationDate().toString()
        );
	}
    

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                null,
                user.getRoles(),
                user.getRegistrationDate().toString()
        );
    }
}
