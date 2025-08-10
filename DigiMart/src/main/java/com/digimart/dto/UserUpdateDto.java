
package com.digimart.dto;

import com.digimart.entities.Role;
import javax.validation.constraints.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserUpdateDto {
    @NotBlank
    private String username;

    @NotNull
    private Role roles;
}
