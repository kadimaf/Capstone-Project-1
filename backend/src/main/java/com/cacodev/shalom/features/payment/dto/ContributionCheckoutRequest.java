package com.cacodev.shalom.features.payment.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record ContributionCheckoutRequest(
        UUID memberId,
        BigDecimal amount,
        String currency,
        String description,
        UUID contributionId
) {}
