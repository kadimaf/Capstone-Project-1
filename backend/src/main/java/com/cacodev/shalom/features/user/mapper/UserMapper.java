package com.cacodev.shalom.features.user.mapper;

import com.cacodev.shalom.features.user.User;
import com.cacodev.shalom.features.user.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "member.id", target = "memberId")
    @Mapping(source = "member.memberId", target = "memberNumber")
    UserDTO toDTO(User user);
}
