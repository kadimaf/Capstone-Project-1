package com.cacodev.shalom.features.member.dto;

import java.util.UUID;

public record MemberTypeDTO(
        UUID id, String name,
        String description,
        double membershipFee,
        int membershipDurationMonths,
        boolean hasVotingRights,
        String privileges,
        boolean isActive
) {}
