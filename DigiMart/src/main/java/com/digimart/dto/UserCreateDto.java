
package com.digimart.dto;

import javax.validation.constraints.*;


import com.digimart.entities.Role;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserCreateDto {
    @Email @NotBlank
    private String email;

    @NotBlank
    private String username;

    @NotBlank 
    private String password;

    @NotNull
    private Role roles;  // ADMIN or USER
}
