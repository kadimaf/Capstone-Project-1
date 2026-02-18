package com.cacodev.shalom.features.payment.service;

import com.cacodev.shalom.config.stripe.StripeConfig;
import com.cacodev.shalom.features.member.domain.Member;
import com.cacodev.shalom.features.payment.dto.ContributionCheckoutRequest;
import com.cacodev.shalom.features.payment.dto.DonationCheckoutRequest;
import com.cacodev.shalom.features.payment.dto.SubscriptionCheckoutRequest;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class StripeService {

    private final StripeConfig stripeConfig;

    /**
     * Create Checkout Session for one-time donation
     */
    public Session createDonationCheckoutSession(DonationCheckoutRequest request,
                                                  String customerEmail) throws StripeException {
        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(stripeConfig.getSuccessUrl())
                .setCancelUrl(stripeConfig.getCancelUrl())
                .setCustomerEmail(customerEmail)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency(request.currency().toLowerCase())
                                                .setUnitAmount(request.amount()
                                                        .multiply(BigDecimal.valueOf(100)).longValue())
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Donation - " + request.purpose())
                                                                .setDescription("Donation to CACODEV Community")
                                                                .build()
                                                )
                                                .build()
                                )
                                .setQuantity(1L)
                                .build()
                )
                .putMetadata("type", "DONATION")
                .putMetadata("purpose", request.purpose() != null ? request.purpose() : "General")
                .putMetadata("isAnonymous", String.valueOf(request.isAnonymous()));

        if (request.memberId() != null) {
            paramsBuilder.putMetadata("memberId", request.memberId().toString());
        }

        return Session.create(paramsBuilder.build());
    }

    /**
     * Create Checkout Session for member contribution payment.
     */
    public Session createContributionCheckoutSession(ContributionCheckoutRequest request,
                                                      Member member,
                                                      String customerId) throws StripeException {
        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(stripeConfig.getSuccessUrl())
                .setCancelUrl(stripeConfig.getCancelUrl())
                .setCustomer(customerId)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency(request.currency().toLowerCase())
                                                .setUnitAmount(request.amount()
                                                        .multiply(BigDecimal.valueOf(100)).longValue())
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Member Contribution")
                                                                .setDescription(request.description() != null
                                                                        ? request.description()
                                                                        : "Contribution Payment")
                                                                .build()
                                                )
                                                .build()
                                )
                                .setQuantity(1L)
                                .build()
                )
                .putMetadata("type", "CONTRIBUTION")
                .putMetadata("memberId", request.memberId().toString());

        if (request.contributionId() != null) {
            paramsBuilder.putMetadata("contributionId", request.contributionId().toString());
        }

        return Session.create(paramsBuilder.build());
    }

    /**
     * Create Checkout Session for recurring subscription
     */
    public Session createSubscriptionCheckoutSession(SubscriptionCheckoutRequest request,
                                                      String customerId) throws StripeException {
        // Create a Price for the subscription
        String priceId = createRecurringPrice(request);

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .setSuccessUrl(stripeConfig.getSuccessUrl())
                .setCancelUrl(stripeConfig.getCancelUrl())
                .setCustomer(customerId)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPrice(priceId)
                                .setQuantity(1L)
                                .build()
                )
                .putMetadata("type", "SUBSCRIPTION")
                .putMetadata("memberId", request.memberId().toString())
                .putMetadata("interval", request.interval())
                .build();

        return Session.create(params);
    }

    /**
     * Create recurring price for subscription
     */
    private String createRecurringPrice(SubscriptionCheckoutRequest request) throws StripeException {
        // Create product
        ProductCreateParams productParams = ProductCreateParams.builder()
                .setName("Recurring Contribution - " + request.interval() + "ly")
                .setDescription(request.description() != null ? request.description() : "Recurring Contribution")
                .build();
        Product product = Product.create(productParams);

        // Create price
        PriceCreateParams.Recurring.Interval interval =
                "year".equalsIgnoreCase(request.interval())
                        ? PriceCreateParams.Recurring.Interval.YEAR
                        : PriceCreateParams.Recurring.Interval.MONTH;

        PriceCreateParams priceParams = PriceCreateParams.builder()
                .setProduct(product.getId())
                .setCurrency(request.currency().toLowerCase())
                .setUnitAmount(request.amount().multiply(BigDecimal.valueOf(100)).longValue())
                .setRecurring(
                        PriceCreateParams.Recurring.builder()
                                .setInterval(interval)
                                .build()
                )
                .build();

        Price price = Price.create(priceParams);
        return price.getId();
    }

    /**
     * Get or create Stripe customer for member
     */
    public String getOrCreateStripeCustomer(Member member) throws StripeException {
        // If member already has stripeCustomerId, return it
        if (member.getStripeCustomerId() != null && !member.getStripeCustomerId().isEmpty()) {
            return member.getStripeCustomerId();
        }

        // Create new Stripe customer
        CustomerCreateParams params = CustomerCreateParams.builder()
                .setEmail(member.getEmail())
                .setName(member.getFirstName() + " " + member.getLastName())
                .putMetadata("memberId", member.getId().toString())
                .putMetadata("memberNumber", member.getMemberId())
                .build();

        Customer customer = Customer.create(params);
        return customer.getId();
    }
}
