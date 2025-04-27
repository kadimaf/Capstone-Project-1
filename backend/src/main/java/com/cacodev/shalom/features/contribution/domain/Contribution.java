package com.cacodev.shalom.features.contribution.domain;

import com.cacodev.shalom.common.base.BaseEntity;
import com.cacodev.shalom.features.member.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CONTRIBUTIONS")
@Entity
public class Contribution extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private Double amount;

    private String description;

    private LocalDateTime date;

    private ContributionType type;

    @Enumerated(EnumType.STRING)
    private ContributionStatus status;
}