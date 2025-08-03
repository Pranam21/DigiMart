package com.digimart.service;




import com.digimart.dto.*;

public interface UserService {
    UserDto registerUser(UserDto userDto);
    UserDto getUserByEmail(String email);
}
