package com.cacodev.shalom.features.member.dto;

import com.cacodev.shalom.common.base.Gender;

public record MemberUpdatePersonalInfoRequest(
        String firstName,
        String middleName,
        String lastName,
        Gender gender,
        String email,
        String phoneNumber
) {}