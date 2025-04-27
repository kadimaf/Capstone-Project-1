package com.cacodev.shalom.features.event.dto;

public record EventMemberDTO(
        String memberId,
        String firstName,
        String middleName,
        String lastName
) {}