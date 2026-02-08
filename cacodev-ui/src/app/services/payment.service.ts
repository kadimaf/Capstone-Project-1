import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DonationCheckoutRequest {
  amount: number;
  currency: string;
  purpose: string;
  isAnonymous: boolean;
  memberId?: string;
  donorEmail: string;
  donorName: string;
}

export interface ContributionCheckoutRequest {
  memberId: string;
  amount: number;
  currency: string;
  description: string;
  contributionId?: string;
}

export interface SubscriptionCheckoutRequest {
  memberId: string;
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  description: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  checkoutUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseApiUrl = 'http://localhost:8080/cacodev/api/payments';

  constructor(private http: HttpClient) {}

  createDonationCheckout(request: DonationCheckoutRequest): Observable<CheckoutSessionResponse> {
    return this.http.post<CheckoutSessionResponse>(`${this.baseApiUrl}/checkout/donation`, request);
  }

  createContributionCheckout(request: ContributionCheckoutRequest): Observable<CheckoutSessionResponse> {
    return this.http.post<CheckoutSessionResponse>(`${this.baseApiUrl}/checkout/contribution`, request);
  }

  createSubscriptionCheckout(request: SubscriptionCheckoutRequest): Observable<CheckoutSessionResponse> {
    return this.http.post<CheckoutSessionResponse>(`${this.baseApiUrl}/checkout/subscription`, request);
  }

  redirectToCheckout(checkoutUrl: string): void {
    window.location.href = checkoutUrl;
  }
}
