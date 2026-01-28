package com.cacodev.shalom.features.member.mapper;

import com.cacodev.shalom.features.member.domain.Member;
import com.cacodev.shalom.features.member.dto.MemberCreateRequest;
import com.cacodev.shalom.features.member.dto.MemberDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberMapper {

//    @Mapping(target = "active", source = "isActive")
    @Mapping(target = "joinDate", source = "createdAt")
    MemberDTO memberToMemberDTO(Member member);

    @Mapping(target = "id", ignore = true)
    Member toMemberEntity(MemberCreateRequest request);
}