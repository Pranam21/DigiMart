
package com.digimart.dto;

import javax.validation.constraints.Size;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PasswordChangeDto {
    @Size(min = 6)
    private String newPassword;
}
