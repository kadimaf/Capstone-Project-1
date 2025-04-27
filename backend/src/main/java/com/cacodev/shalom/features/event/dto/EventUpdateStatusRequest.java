package com.cacodev.shalom.features.event.dto;

import com.cacodev.shalom.features.event.domain.EventStatus;

public record EventUpdateStatusRequest(
        EventStatus status,
        String comments
) {}