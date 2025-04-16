import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../../services/member.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberType } from '../../../models/MemberType';
import { MemberTypeService } from '../../../services/member-type.service';

@Component({
  selector: 'app-member-add',
  standalone: false,
  templateUrl: './member-add.component.html',
  styleUrl: './member-add.component.scss'
})
export class MemberAddComponent implements OnInit {

  memberForm!: FormGroup;
  memberTypes: MemberType[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private memberTypeService: MemberTypeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.memberTypeService.getMemberTypes().subscribe({
      next: (types) => (this.memberTypes = types),
      error: (err) => console.error('Failed to load member types', err)
    });

    this.memberForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      memberTypeId: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.memberForm.invalid) return;

    const formRawValue = this.memberForm.value;

    const memberData = {
      ...formRawValue,
      dateOfBirth: formRawValue.dateOfBirth?.toISOString().split('T')[0],
    };

    this.memberService.addMember(memberData).subscribe({
      next: (newMember) => {
        this.snackBar.open(newMember.firstName + ' was added successfully as a member', 'OK', { duration: 5000, verticalPosition: 'top' });
        this.router.navigate(['/management/members']);
      },
      error: (err) => {
        this.snackBar.open('Error adding new member. ', err);
        console.log(err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/management/members']);
  }

}
