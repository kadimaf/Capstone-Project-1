import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ContributionService } from '../../../services/contribution.service';
import { MemberService } from '../../../services/member.service';
import { PaymentService, ContributionCheckoutRequest } from '../../../services/payment.service';
import { Member } from '../../../models/Member';
import { ContributionType } from '../../../enums/contributionType';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-contribution-dialog',
  standalone: false,
  templateUrl: './add-contribution-dialog.component.html',
  styleUrl: './add-contribution-dialog.component.scss'
})
export class AddContributionDialogComponent implements OnInit {
  contributionForm: FormGroup;
  ContributionType = Object.values(ContributionType);
  loading = false;

  members: Member[] = [];
  filteredMembers: Member[] = [];
  memberSearch = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddContributionDialogComponent>,
    private contributionService: ContributionService,
    private memberService: MemberService,
    private paymentService: PaymentService,
    private snackBar: MatSnackBar
  ) {
    this.contributionForm = this.fb.group({
      memberId: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      description: [''],
      type: ['DONATION', Validators.required],
      currency: ['USD', Validators.required]
    });
  }

  ngOnInit(): void {
    this.memberService.getMembers().subscribe((members) => {
      this.members = members;
      this.filteredMembers = members;
    });
  }

  // Filter members based on search input
  ngOnChanges(): void {
    this.filterMembers();
  }

  ngDoCheck(): void {
    this.filterMembers();
  }

  filterMembers(): void {
    this.filteredMembers = this.members.filter(member =>
      `${member.firstName} ${member.lastName}`.toLowerCase().includes(this.memberSearch.toLowerCase()) ||
      member.memberId.toLowerCase().includes(this.memberSearch.toLowerCase())
    );
  }

  getSelectedMemberName(): string | null {
    const selectedId = this.contributionForm.get('memberId')?.value;
    const selected = this.members.find(m => m.id === selectedId);
    return selected ? `${selected.firstName} ${selected.lastName}` : null;
  }

  submit(): void {
    if (this.contributionForm.invalid) {
      return;
    }

    this.loading = true;
    const formValue = this.contributionForm.value;

    // Create a Stripe checkout session for the contribution
    const request: ContributionCheckoutRequest = {
      memberId: formValue.memberId,
      amount: formValue.amount,
      currency: formValue.currency,
      description: formValue.description || `${formValue.type} Contribution`
    };

    this.paymentService.createContributionCheckout(request).subscribe({
      next: (response) => {
        // Redirect to Stripe Checkout
        this.paymentService.redirectToCheckout(response.checkoutUrl);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error creating checkout session:', err);
        this.snackBar.open('Failed to initiate payment. Please try again.', 'Close', {
          duration: 7000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  onCancel(): void {
    this.contributionForm.reset();
    this.dialogRef.close();
  }
}
