package com.cacodev.shalom.features.payment.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record SubscriptionCheckoutRequest(
        UUID memberId,
        BigDecimal amount,
        String currency,
        String interval,
        String description
) {}
