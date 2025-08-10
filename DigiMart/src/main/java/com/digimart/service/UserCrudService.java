
package com.digimart.service;

import com.digimart.dto.*;
import java.util.List;

public interface UserCrudService {
    // ADMIN
    List<UserDto> listAll();
    UserDto getById(Long id);
    UserDto create(UserCreateDto dto);
    UserDto update(Long id, UserUpdateDto dto);
    void delete(Long id);

    // USER self
    UserDto me(String email);
    UserDto updateMe(String email, UserSelfUpdateDto dto);
    void changeMyPassword(String email, PasswordChangeDto dto);
}
