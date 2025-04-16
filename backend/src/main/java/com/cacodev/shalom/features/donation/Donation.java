package com.cacodev.shalom.features.donation;

import com.cacodev.shalom.common.base.BaseEntity;
import com.cacodev.shalom.features.member.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "DONATIONS")
@Entity
public class Donation extends BaseEntity {

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private LocalDateTime donationDate;

    private String paymentMethod;

    private String transactionId;

    private boolean isAnonymous;

    private String purpose; // General, Specific project, Emergency relief, etc.

    private boolean taxReceiptIssued;

    // For recurring donations
    private boolean isRecurring;

    @Enumerated(EnumType.STRING)
    private DonationFrequency recurringFrequency; // Monthly, Quarterly, Annually

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}