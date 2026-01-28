package com.cacodev.shalom.features.member.dto;

import com.cacodev.shalom.features.member.domain.MemberRole;

import java.util.UUID;

public record MemberTypeDTO(
        UUID id, String name,
        String description,
        double membershipFee,
        int membershipDurationMonths,
        boolean hasVotingRights,
        MemberRole memberRole,
        String privileges,
        boolean isActive
) {}
