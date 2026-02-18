package com.cacodev.shalom.features.payment.service;

import com.cacodev.shalom.exceptions.ResourceNotFound;
import com.cacodev.shalom.features.contribution.domain.ContributionStatus;
import com.cacodev.shalom.features.contribution.repository.ContributionRepository;
import com.cacodev.shalom.features.member.domain.Member;
import com.cacodev.shalom.features.member.repository.MemberRepository;
import com.cacodev.shalom.features.payment.domain.Payment;
import com.cacodev.shalom.features.payment.domain.PaymentStatus;
import com.cacodev.shalom.features.payment.domain.PaymentType;
import com.cacodev.shalom.features.payment.dto.CheckoutSessionResponse;
import com.cacodev.shalom.features.payment.dto.ContributionCheckoutRequest;
import com.cacodev.shalom.features.payment.dto.DonationCheckoutRequest;
import com.cacodev.shalom.features.payment.dto.SubscriptionCheckoutRequest;
import com.cacodev.shalom.features.payment.repository.PaymentRepository;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final StripeService stripeService;
    private final PaymentRepository paymentRepository;
    private final MemberRepository memberRepository;
    private final ContributionRepository contributionRepository;

    @Transactional
    public CheckoutSessionResponse createDonationCheckout(DonationCheckoutRequest request) {
        try {
            Session session = stripeService.createDonationCheckoutSession(
                    request, request.donorEmail()
            );

            // Create pending payment record
            Payment payment = new Payment();
            payment.setAmount(request.amount());
            payment.setCurrency(request.currency());
            payment.setType(PaymentType.DONATION);
            payment.setStatus(PaymentStatus.PENDING);
            payment.setStripeSessionId(session.getId());
            payment.setPurpose(request.purpose());
            payment.setAnonymous(request.isAnonymous());
            payment.setRecurring(false);

            if (request.memberId() != null) {
                Member member = memberRepository.findById(request.memberId()).orElse(null);
                payment.setMember(member);
            }

            paymentRepository.save(payment);

            return new CheckoutSessionResponse(session.getId(), session.getUrl());
        } catch (Exception e) {
            log.error("Error creating donation checkout session", e);
            throw new RuntimeException("Failed to create checkout session: " + e.getMessage(), e);
        }
    }

    @Transactional
    public CheckoutSessionResponse createContributionCheckout(ContributionCheckoutRequest request) {
        try {
            Member member = memberRepository.findById(request.memberId())
                    .orElseThrow(() -> new ResourceNotFound(
                            String.format("Member not found with ID: '%s'", request.memberId())
                    ));

            // Get or create Stripe customer
            String customerId = stripeService.getOrCreateStripeCustomer(member);

            // Save stripeCustomerId to member if new
            if (member.getStripeCustomerId() == null || member.getStripeCustomerId().isEmpty()) {
                member.setStripeCustomerId(customerId);
                memberRepository.save(member);
            }

            Session session = stripeService.createContributionCheckoutSession(request, member, customerId);

            // Create pending payment record
            Payment payment = new Payment();
            payment.setAmount(request.amount());
            payment.setCurrency(request.currency());
            payment.setType(PaymentType.CONTRIBUTION);
            payment.setStatus(PaymentStatus.PENDING);
            payment.setStripeSessionId(session.getId());
            payment.setStripeCustomerId(customerId);
            payment.setDescription(request.description());
            payment.setMember(member);
            payment.setContributionId(request.contributionId());
            payment.setRecurring(false);

            paymentRepository.save(payment);

            return new CheckoutSessionResponse(session.getId(), session.getUrl());
        } catch (ResourceNotFound e) {
            throw e;
        } catch (Exception e) {
            log.error("Error creating contribution checkout session", e);
            throw new RuntimeException("Failed to create checkout session: " + e.getMessage(), e);
        }
    }

    @Transactional
    public CheckoutSessionResponse createSubscriptionCheckout(SubscriptionCheckoutRequest request) {
        try {
            Member member = memberRepository.findById(request.memberId())
                    .orElseThrow(() -> new ResourceNotFound(
                            String.format("Member not found with ID: '%s'", request.memberId())
                    ));

            // Get or create Stripe customer
            String customerId = stripeService.getOrCreateStripeCustomer(member);

            // Save stripeCustomerId to member if new
            if (member.getStripeCustomerId() == null || member.getStripeCustomerId().isEmpty()) {
                member.setStripeCustomerId(customerId);
                memberRepository.save(member);
            }

            Session session = stripeService.createSubscriptionCheckoutSession(request, customerId);

            // Create pending payment record
            Payment payment = new Payment();
            payment.setAmount(request.amount());
            payment.setCurrency(request.currency());
            payment.setType(PaymentType.SUBSCRIPTION);
            payment.setStatus(PaymentStatus.PENDING);
            payment.setStripeSessionId(session.getId());
            payment.setStripeCustomerId(customerId);
            payment.setDescription(request.description());
            payment.setMember(member);
            payment.setRecurring(true);
            payment.setRecurringInterval(request.interval());

            paymentRepository.save(payment);

            return new CheckoutSessionResponse(session.getId(), session.getUrl());
        } catch (ResourceNotFound e) {
            throw e;
        } catch (Exception e) {
            log.error("Error creating subscription checkout session", e);
            throw new RuntimeException("Failed to create checkout session: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void handleCheckoutCompleted(Session session) {
        String sessionId = session.getId();

        paymentRepository.findByStripeSessionId(sessionId).ifPresent(payment -> {
            payment.setStatus(PaymentStatus.COMPLETED);
            payment.setStripePaymentIntentId(session.getPaymentIntent());
            payment.setCompletedAt(LocalDateTime.now());

            if (session.getSubscription() != null) {
                payment.setStripeSubscriptionId(session.getSubscription());
            }

            paymentRepository.save(payment);

            // Update linked Contribution status if applicable
            if (payment.getContributionId() != null) {
                contributionRepository.findById(payment.getContributionId())
                        .ifPresent(contribution -> {
                            contribution.setStatus(ContributionStatus.COMPLETED);
                            contributionRepository.save(contribution);
                        });
            }

            log.info("Payment completed for session: {}", sessionId);
        });
    }

    @Transactional
    public void handlePaymentFailed(String sessionId) {
        paymentRepository.findByStripeSessionId(sessionId).ifPresent(payment -> {
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);

            // Update linked Contribution status if applicable
            if (payment.getContributionId() != null) {
                contributionRepository.findById(payment.getContributionId())
                        .ifPresent(contribution -> {
                            contribution.setStatus(ContributionStatus.FAILED);
                            contributionRepository.save(contribution);
                        });
            }

            log.info("Payment failed for session: {}", sessionId);
        });
    }

    @Transactional
    public void handleSubscriptionUpdated(Subscription subscription) {
        String subscriptionId = subscription.getId();

        paymentRepository.findByStripeSubscriptionId(subscriptionId).ifPresent(payment -> {
            String status = subscription.getStatus();
            if ("active".equals(status)) {
                payment.setStatus(PaymentStatus.COMPLETED);
            } else if ("canceled".equals(status) || "unpaid".equals(status)) {
                payment.setStatus(PaymentStatus.CANCELED);
            }
            paymentRepository.save(payment);

            log.info("Subscription {} status updated to: {}", subscriptionId, status);
        });
    }
}
