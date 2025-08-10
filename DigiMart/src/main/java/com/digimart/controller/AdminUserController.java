// src/main/java/com/digimart/controller/AdminUserController.java
package com.digimart.controller;

import com.digimart.dto.*;
import com.digimart.service.UserCrudService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final UserCrudService svc;

    @GetMapping
    public List<UserDto> listAll() { return svc.listAll(); }

    @GetMapping("/{id}")
    public UserDto get(@PathVariable Long id) { return svc.getById(id); }

    @PostMapping
    public UserDto create(@Valid @RequestBody UserCreateDto dto) { return svc.create(dto); }

    @PutMapping("/{id}")
    public UserDto update(@PathVariable Long id, @Valid @RequestBody UserUpdateDto dto) {
        return svc.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { svc.delete(id); }
}
