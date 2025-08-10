
package com.digimart.service;

import com.digimart.Repository.UserRepository;
import com.digimart.dto.*;
import com.digimart.entities.Role;
import com.digimart.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import static com.digimart.dto.UserMapper.toDto;

@Service
@RequiredArgsConstructor
public class UserCrudServiceImpl implements UserCrudService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> listAll() {
        return userRepository.findAll().stream().map(UserMapper::toDto).toList();
    }

    @Override
    public UserDto getById(Long id) {
        User u = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return toDto(u);
    }

    @Override
    public UserDto create(UserCreateDto dto) {
        if (userRepository.existsByEmail(dto.getEmail()))
            throw new RuntimeException("Email already in use");

        User u = new User();
        u.setEmail(dto.getEmail());
        // pick the right setter based on your entity
        if (hasSetter(u, "setUsername")) u.setUsername(dto.getUsername());
        else u.setUsername(dto.getUsername());
        u.setPassword(passwordEncoder.encode(dto.getPassword()));
        u.setRoles(dto.getRoles() == null ? Role.USER : dto.getRoles());
        // optional if you have this column:
        try { u.setRegistrationDate(LocalDate.now()); } catch (Exception ignored) {}

        return toDto(userRepository.save(u));
    }

    @Override
    public UserDto update(Long id, UserUpdateDto dto) {
        User u = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (hasSetter(u, "setUsername")) u.setUsername(dto.getUsername());
        else u.setUsername(dto.getUsername());
        u.setRoles(dto.getRoles());

        return toDto(userRepository.save(u));
    }

    @Override
    public void delete(Long id) {
        if (!userRepository.existsById(id)) throw new RuntimeException("User not found");
        userRepository.deleteById(id);
    }

    @Override
    public UserDto me(String email) {
        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return toDto(u);
    }

    @Override
    public UserDto updateMe(String email, UserSelfUpdateDto dto) {
        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (hasSetter(u, "setUsername")) u.setUsername(dto.getUsername());
        else u.setUsername(dto.getUsername());

        return toDto(userRepository.save(u));
    }

    @Override
    public void changeMyPassword(String email, PasswordChangeDto dto) {
        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        u.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(u);
    }

    private boolean hasSetter(User u, String method) {
        try { u.getClass().getMethod(method, String.class); return true; }
        catch (NoSuchMethodException e) { return false; }
    }
}
