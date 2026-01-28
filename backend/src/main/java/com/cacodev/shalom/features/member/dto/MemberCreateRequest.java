package com.cacodev.shalom.features.member.dto;

import com.cacodev.shalom.common.base.Gender;

import java.time.LocalDate;
import java.util.UUID;

public record MemberCreateRequest(
        String firstName,
        String middleName,
        String lastName,
        Gender gender,
        String email,
        String phoneNumber,
        LocalDate dateOfBirth,
        UUID memberTypeId
) {}