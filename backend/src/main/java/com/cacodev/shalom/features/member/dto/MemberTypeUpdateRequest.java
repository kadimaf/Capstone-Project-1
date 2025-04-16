package com.cacodev.shalom.features.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberTypeUpdateRequest {
    private double membershipFee;

    private int membershipDurationMonths; // Duration in months

    private boolean hasVotingRights;

    private String privileges;
}