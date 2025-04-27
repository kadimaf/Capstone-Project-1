package com.cacodev.shalom.features.contribution.mapper;

import com.cacodev.shalom.features.contribution.domain.Contribution;
import com.cacodev.shalom.features.contribution.dto.ContributionCreateRequest;
import com.cacodev.shalom.features.contribution.dto.ContributionDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContributionMapper {

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.id", target = "mbrId")
    ContributionDTO toDTO(Contribution contribution);

    @Mapping(target = "id", ignore = true)
    Contribution toEntity(ContributionCreateRequest request);
}