
package com.digimart.dto;

import com.digimart.entities.User;

import java.time.format.DateTimeFormatter;

public final class UserMapper {
    private UserMapper() {}

    public static UserDto toDto(User u) {
        if (u == null) return null;
        UserDto dto = new UserDto();
        dto.setId(u.getId());
        dto.setEmail(u.getEmail());
        // Adjust if your entity uses getUserName() instead of getUsername()
        dto.setUsername(u.getUsername() != null ? u.getUsername() : u.getUsername());
        dto.setRoles(u.getRoles());
        // registrationDate as String
        dto.setRegistrationDate(u.getRegistrationDate() != null
                ? u.getRegistrationDate().toString() : null);
        // NEVER set password in a response
        dto.setPassword(null);
        return dto;
    }
}
