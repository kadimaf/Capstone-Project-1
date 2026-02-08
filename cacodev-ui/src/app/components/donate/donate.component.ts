import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService, DonationCheckoutRequest } from '../../services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-donate',
  standalone: false,
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss'
})
export class DonateComponent implements OnInit {

  donationForm!: FormGroup;
  loading = false;
  predefinedAmounts = [25, 50, 100, 250, 500];
  purposes = ['General Fund', 'Building Fund', 'Youth Ministry', 'Missions', 'Emergency Relief', 'Other'];
  selectedAmount: number | null = null;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.donationForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      customAmount: [null],
      currency: ['USD', Validators.required],
      purpose: ['General Fund', Validators.required],
      isAnonymous: [false],
      donorEmail: ['', [Validators.required, Validators.email]],
      donorName: ['', Validators.required]
    });
  }

  selectAmount(amount: number): void {
    this.selectedAmount = amount;
    this.donationForm.patchValue({ amount, customAmount: null });
  }

  onCustomAmountChange(): void {
    const customAmount = this.donationForm.get('customAmount')?.value;
    if (customAmount) {
      this.selectedAmount = null;
      this.donationForm.patchValue({ amount: customAmount });
    }
  }

  onSubmit(): void {
    if (this.donationForm.invalid) {
      return;
    }

    this.loading = true;

    const request: DonationCheckoutRequest = {
      amount: this.donationForm.value.amount,
      currency: this.donationForm.value.currency,
      purpose: this.donationForm.value.purpose,
      isAnonymous: this.donationForm.value.isAnonymous,
      donorEmail: this.donationForm.value.donorEmail,
      donorName: this.donationForm.value.donorName
    };

    this.paymentService.createDonationCheckout(request).subscribe({
      next: (response) => {
        this.paymentService.redirectToCheckout(response.checkoutUrl);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open('Failed to initiate payment. Please try again.', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
        console.error('Checkout error:', err);
      }
    });
  }
}
