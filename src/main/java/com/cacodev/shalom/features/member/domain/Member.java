package com.cacodev.shalom.features.member.domain;

import com.cacodev.shalom.common.base.BaseEntity;
import com.cacodev.shalom.common.base.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "MEMBERS")
@Entity
public class Member extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String memberId;

    @Column(nullable = false)
    private String firstName;

    private String middleName;

    @Column(nullable = false)
    private String lastName;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String email;

    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "member_type_id")
    private MemberType memberType;

    private Double contributionAmount;

    private String currency;

    private String contributionFrequency;
}