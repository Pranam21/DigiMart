package com.digimart.dto;





import java.util.List;

import com.digimart.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String password;   // Optional: Omit in responses for security
    private Role roles;
    private String registrationDate;
}



