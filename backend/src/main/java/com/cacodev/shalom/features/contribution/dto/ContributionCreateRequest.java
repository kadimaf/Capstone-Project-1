package com.cacodev.shalom.features.contribution.dto;

import com.cacodev.shalom.features.contribution.domain.ContributionType;

public record ContributionCreateRequest(
        Double amount,
        String description,
        ContributionType type
) {}
