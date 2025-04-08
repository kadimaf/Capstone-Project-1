package com.cacodev.shalom.features.member.dto;

public record MemberTypeCreateRequest(
        String name,
        String description,
        double membershipFee,
        int membershipDurationMonths,
        boolean hasVotingRights,
        String privileges
) {}