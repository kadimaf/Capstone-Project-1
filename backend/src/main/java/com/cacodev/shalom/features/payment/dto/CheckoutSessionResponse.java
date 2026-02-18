package com.cacodev.shalom.features.payment.dto;

public record CheckoutSessionResponse(
        String sessionId,
        String checkoutUrl
) {}
