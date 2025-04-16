package com.cacodev.shalom.features.member.dto;

import com.cacodev.shalom.common.base.Gender;

import java.time.LocalDate;
import java.util.UUID;

public record MemberDTO(
        UUID id,
        String memberId,
        String firstName,
        String middleName,
        String lastName,
        Gender gender,
        String email,
        String phoneNumber,
        String dateOfBirth,
        LocalDate joinDate,
        MemberTypeDTO memberType,
        LocalDate membershipExpiryDate,
        boolean active
) {}