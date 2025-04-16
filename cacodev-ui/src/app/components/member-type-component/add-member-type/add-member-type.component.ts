import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MemberRole } from '../../../enums/memberRole';
import { MemberTypeService } from '../../../services/member-type.service';

@Component({
  selector: 'app-add-member-type',
  standalone: false,
  templateUrl: './add-member-type.component.html',
  styleUrl: './add-member-type.component.scss'
})
export class AddMemberTypeComponent {
  memberTypeForm: FormGroup;
  memberRoles = Object.values(MemberRole);

  constructor(
    private fb: FormBuilder, 
    private service: MemberTypeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.memberTypeForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      membershipFee: [0, Validators.required],
      membershipDurationMonths: [1, Validators.required],
      hasVotingRights: [false],
      memberRole: ['', Validators.required],
      privileges: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.memberTypeForm.valid) {
      this.service.createMemberType(this.memberTypeForm.value).subscribe({
        next: (newType) => {
          this.snackBar.open('Member type added successfully!', 'Close', { duration: 5000, verticalPosition: 'top' });
          console.log(this.memberTypeForm.value);
          this.memberTypeForm.reset();
          this.router.navigate(['/management/member-types']);
        },
        error: (err) => {
          this.snackBar.open('Error adding new member type. ', err);
          console.log(err);
        }
      });
    }
  }

  onCancel() {
    this.memberTypeForm.reset();
    this.router.navigate(['/management/member-types']);
  }
}
