
package com.digimart.dto;

import javax.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserSelfUpdateDto {
    @NotBlank
    private String username;
}
