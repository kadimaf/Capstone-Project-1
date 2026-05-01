package com.cacodev.shalom.features.user.dto;

public record AuthResponse(
        String accessToken,
        String refreshToken,
        UserDTO user
) {}

