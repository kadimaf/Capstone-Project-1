package com.cacodev.shalom.features.user.dto;

import com.cacodev.shalom.features.user.Role;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserDTO(
        UUID id,
        String username,
        String email,
        Role role,
        boolean enabled,
        UUID memberId,
        String memberNumber,
        LocalDateTime createdAt
) {}
