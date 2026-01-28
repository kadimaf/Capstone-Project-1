package com.cacodev.shalom.features.event.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record EventCreateRequest(
        UUID organizerId,
        String title,
        String description,
        LocalDateTime dateTime,
        String location
) {}