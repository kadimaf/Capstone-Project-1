package com.cacodev.shalom.features.member.dto;

import com.cacodev.shalom.features.member.domain.MemberRole;

public record MemberTypeCreateRequest(
        String name,
        String description,
        double membershipFee,
        int membershipDurationMonths,
        boolean hasVotingRights,
        MemberRole memberRole,
        String privileges
) {}