import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { MemberPersonalInfoUpdateRequest } from '../../../models/MemberPersonalInfoUpdateRequest';
import { Member } from '../../../models/Member';

@Component({
  selector: 'app-member-edit',
  standalone: false,
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit {
  memberForm!: FormGroup;
  memberId!: string;
  member!: Member;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.memberId = this.route.snapshot.paramMap.get('id')!;

    this.memberService.getMember(this.memberId).subscribe({
      next: (member) => {
        this.member = member;
        this.memberForm = this.fb.group({
          firstName: [member.firstName, Validators.required],
          middleName: [member.middleName],
          lastName: [member.lastName, Validators.required],
          email: [member.email, [Validators.required, Validators.email]],
          phoneNumber: [member.phoneNumber, Validators.required],
          gender: [member.gender, Validators.required]
        });
        this.loading = false;
      }
    })
  }

  onSubmit(): void {
    if (this.memberForm.invalid) {
      return;
    }

    const updatedMember: MemberPersonalInfoUpdateRequest = {
      ...this.memberForm.value,
      id: this.memberId
    };

    this.memberService.updatePersonalInfo(updatedMember, this.memberId).subscribe({
      next: () => {
        this.snackBar.open('Member was updated successfully', 'OK', { duration: 5000, verticalPosition: 'top' });
        this.router.navigate(['/management/members', this.memberId]);
      },
      error: () => {
        this.snackBar.open('Error occurred when updating', 'Close', { duration: 5000, verticalPosition: 'top' });
      }
    });
  }

  onToggleStatus(): void {
    if (!this.member?.id) return;

    this.memberService.enableDisableMember(this.member.id).subscribe({
      next: updatedMember => {
        this.member = updatedMember;
        this.memberForm?.patchValue({ active: updatedMember.active });
      },
      error: err => console.error('Failed to toggle member status:', err)
    });
  }

  onCancel(): void {
    this.router.navigate(['/management/members', this.memberId]);
  }
}
