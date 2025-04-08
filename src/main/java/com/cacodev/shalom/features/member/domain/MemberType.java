package com.cacodev.shalom.features.member.domain;

import com.cacodev.shalom.common.base.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "MEMBER_TYPES")
@Entity
public class MemberType extends BaseEntity {

    private String name;

    private String description;

    private double membershipFee;

    private int membershipDurationMonths; // Duration in months

    private boolean hasVotingRights;

    private String privileges; // Comma-separated list of privileges

    @OneToMany(mappedBy = "memberType", cascade = CascadeType.ALL)
    private Set<Member> members = new HashSet<>();

    private boolean isActive;
}