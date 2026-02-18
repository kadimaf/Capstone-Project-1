package com.cacodev.shalom.features.payment.domain;

import com.cacodev.shalom.common.base.BaseEntity;
import com.cacodev.shalom.features.member.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PAYMENTS")
public class Payment extends BaseEntity {

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String currency;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;

    @Column(name = "stripe_session_id")
    private String stripeSessionId;

    @Column(name = "stripe_payment_intent_id")
    private String stripePaymentIntentId;

    @Column(name = "stripe_subscription_id")
    private String stripeSubscriptionId;

    @Column(name = "stripe_customer_id")
    private String stripeCustomerId;

    private String description;

    private String purpose;

    @Column(name = "is_anonymous")
    private boolean isAnonymous;

    @Column(name = "is_recurring")
    private boolean isRecurring;

    @Column(name = "recurring_interval")
    private String recurringInterval;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "donation_id")
    private UUID donationId;

    @Column(name = "contribution_id")
    private UUID contributionId;
}
