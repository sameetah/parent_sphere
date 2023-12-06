package com.parentsphere.parentsphere.mappers;


import com.parentsphere.parentsphere.dtos.UserDto;
import com.parentsphere.parentsphere.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto userToUserDto(User user);


    User userDtoToUser(UserDto userDto);
}
