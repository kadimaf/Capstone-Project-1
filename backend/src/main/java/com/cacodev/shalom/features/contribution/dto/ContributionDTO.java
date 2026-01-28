package com.cacodev.shalom.features.contribution.dto;

import com.cacodev.shalom.features.contribution.domain.ContributionStatus;
import com.cacodev.shalom.features.contribution.domain.ContributionType;

import java.time.LocalDate;
import java.util.UUID;

public record ContributionDTO(
        UUID id,
        String memberId,
        String mbrId,
        Double amount,
        String description,
        LocalDate date,
        ContributionType type,
        ContributionStatus status
) {}