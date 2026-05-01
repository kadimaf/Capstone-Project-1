package com.cacodev.shalom.features.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record RegisterRequest(
        @NotBlank @Size(min = 3, max = 50)
        String username,

        @NotBlank @Email
        String email,

        @NotBlank @Size(min = 8, message = "Password must be at least 8 characters")
        String password,

        @NotNull(message = "A member ID is required to create an account")
        UUID memberId
) {}
