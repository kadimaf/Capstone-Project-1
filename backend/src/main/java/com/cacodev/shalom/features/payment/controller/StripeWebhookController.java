package com.cacodev.shalom.features.payment.controller;

import com.cacodev.shalom.config.stripe.StripeConfig;
import com.cacodev.shalom.features.payment.service.PaymentService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Stripe", description = "Endpoints for handling Stripe webhooks")
@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
@Slf4j
public class StripeWebhookController {

    private final StripeConfig stripeConfig;
    private final PaymentService paymentService;

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        Event event;

        try {
            // Verify webhook signature - CRITICAL for security
            event = Webhook.constructEvent(
                    payload, sigHeader, stripeConfig.getWebhookSecret()
            );
        } catch (SignatureVerificationException e) {
            log.error("Webhook signature verification failed", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Webhook signature verification failed");
        }

        // Handle the event
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;

        if (dataObjectDeserializer.getObject().isPresent()) {
            stripeObject = dataObjectDeserializer.getObject().get();
        } else {
            log.warn("Unable to deserialize event data object");
            return ResponseEntity.ok("Event received but not processed");
        }

        switch (event.getType()) {
            case "checkout.session.completed":
                Session session = (Session) stripeObject;
                paymentService.handleCheckoutCompleted(session);
                log.info("Checkout session completed: {}", session.getId());
                break;

            case "checkout.session.expired":
            case "checkout.session.async_payment_failed":
                Session failedSession = (Session) stripeObject;
                paymentService.handlePaymentFailed(failedSession.getId());
                log.info("Payment failed for session: {}", failedSession.getId());
                break;

            case "customer.subscription.updated":
            case "customer.subscription.deleted":
                Subscription subscription = (Subscription) stripeObject;
                paymentService.handleSubscriptionUpdated(subscription);
                log.info("Subscription updated: {}", subscription.getId());
                break;

            case "invoice.payment_succeeded":
                log.info("Invoice payment succeeded");
                break;

            case "invoice.payment_failed":
                log.info("Invoice payment failed");
                break;

            default:
                log.info("Unhandled event type: {}", event.getType());
        }

        return ResponseEntity.ok("Event processed");
    }
}
