package com.cacodev.shalom.features.event.dto;

import com.cacodev.shalom.features.event.domain.EventStatus;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

public record EventDTO(
        UUID id,
        String title,
        String organizerId,
        String memberId,
        String description,
        LocalDateTime dateTime,
        String location,
        EventStatus status,
        Set<EventMemberDTO> participants,
        String comments
) {}
