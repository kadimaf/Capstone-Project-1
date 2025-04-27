package com.cacodev.shalom.features.contribution.dto;

import com.cacodev.shalom.features.contribution.domain.ContributionStatus;

public record ContributionUpdateStatusRequest(
        ContributionStatus status
) {}