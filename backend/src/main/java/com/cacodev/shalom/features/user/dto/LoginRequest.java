package com.cacodev.shalom.features.user.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank
        String username,

        @NotBlank
        String password
) {}

