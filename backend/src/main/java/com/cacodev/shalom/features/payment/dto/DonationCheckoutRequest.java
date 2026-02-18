package com.cacodev.shalom.features.payment.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record DonationCheckoutRequest(
        BigDecimal amount,
        String currency,
        String purpose,
        boolean isAnonymous,
        UUID memberId,
        String donorEmail,
        String donorName
) {}
