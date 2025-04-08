package com.cacodev.shalom.features.contribution;

import com.cacodev.shalom.common.base.BaseEntity;
import com.cacodev.shalom.features.member.domain.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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


}