package com.cacodev.shalom.features.member.mapper;

import com.cacodev.shalom.features.member.domain.MemberType;
import com.cacodev.shalom.features.member.dto.MemberTypeCreateRequest;
import com.cacodev.shalom.features.member.dto.MemberTypeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberTypeMapper {
    @Mapping(target = "isActive", source = "active")
    MemberTypeDTO toDTO(MemberType memberType);

    @Mapping(target = "id", ignore = true)
    MemberType toEntity(MemberTypeDTO memberTypeDTO);

    @Mapping(target = "id", ignore = true)
    MemberType toEntity(MemberTypeCreateRequest request);

    List<MemberTypeDTO> toDTO(List<MemberType> memberTypes);
}