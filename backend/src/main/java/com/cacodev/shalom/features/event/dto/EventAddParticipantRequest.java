package com.cacodev.shalom.features.event.dto;

import java.util.UUID;

public record EventAddParticipantRequest(
        UUID participantId
) {}
