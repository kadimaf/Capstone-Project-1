package com.cacodev.shalom.features.payment.repository;

import com.cacodev.shalom.features.payment.domain.Payment;
import com.cacodev.shalom.features.payment.domain.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    Optional<Payment> findByStripeSessionId(String stripeSessionId);

    Optional<Payment> findByStripeSubscriptionId(String stripeSubscriptionId);

    List<Payment> findByMemberId(UUID memberId);

    List<Payment> findByStatus(PaymentStatus status);

    List<Payment> findByMemberIdAndStatus(UUID memberId, PaymentStatus status);
}
