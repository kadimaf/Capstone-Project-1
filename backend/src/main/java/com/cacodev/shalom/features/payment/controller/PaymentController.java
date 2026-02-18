package com.cacodev.shalom.features.payment.controller;

import com.cacodev.shalom.features.payment.dto.CheckoutSessionResponse;
import com.cacodev.shalom.features.payment.dto.ContributionCheckoutRequest;
import com.cacodev.shalom.features.payment.dto.DonationCheckoutRequest;
import com.cacodev.shalom.features.payment.dto.SubscriptionCheckoutRequest;
import com.cacodev.shalom.features.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Payments", description = "Stripe payment operations")
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @Operation(summary = "Create checkout session for one-time donation")
    @PostMapping("/checkout/donation")
    public ResponseEntity<CheckoutSessionResponse> createDonationCheckout(
            @RequestBody DonationCheckoutRequest request) {
        return ResponseEntity.ok(paymentService.createDonationCheckout(request));
    }

    @Operation(summary = "Create checkout session for member contribution")
    @PostMapping("/checkout/contribution")
    public ResponseEntity<CheckoutSessionResponse> createContributionCheckout(
            @RequestBody ContributionCheckoutRequest request) {
        return ResponseEntity.ok(paymentService.createContributionCheckout(request));
    }

    @Operation(summary = "Create checkout session for recurring subscription")
    @PostMapping("/checkout/subscription")
    public ResponseEntity<CheckoutSessionResponse> createSubscriptionCheckout(
            @RequestBody SubscriptionCheckoutRequest request) {
        return ResponseEntity.ok(paymentService.createSubscriptionCheckout(request));
    }
}
