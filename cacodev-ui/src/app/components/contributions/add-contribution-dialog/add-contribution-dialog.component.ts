import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ContributionService } from '../../../services/contribution.service';
import { MemberService } from '../../../services/member.service';
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

  members: Member[] = [];
  filteredMembers: Member[] = [];
  memberSearch = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddContributionDialogComponent>,
    private contributionService: ContributionService,
    private memberService: MemberService,
    private snackBar: MatSnackBar
  ) {
    this.contributionForm = this.fb.group({
      memberId: ['', Validators.required],
      amount: [null, Validators.required],
      description: [''],
      type: ['DONATION', Validators.required]
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
    const memberId = this.contributionForm.get('memberId')?.value;
    if (this.contributionForm.valid) {
      const contribution = this.contributionForm.value;
      this.contributionService.createContribution(memberId, contribution).subscribe({
        next: () => {
          this.snackBar.open('Contribution added successfully!', 'Close', {
            duration: 7000, 
            verticalPosition: 'top', 
            panelClass: ['snackbar-success']
          });
          this.dialogRef.close('success');
        },
        error: err => {
          console.error('Error saving contribution:', err);
          this.snackBar.open('Error trying to make contribution', 'Close', {
            duration: 7000, 
            verticalPosition: 'top', 
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

  onCancel(): void {
    this.contributionForm.reset();
    this.dialogRef.close();
  }
}
