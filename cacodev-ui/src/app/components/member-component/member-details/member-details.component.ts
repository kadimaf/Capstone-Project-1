import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/Member';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member-details',
  standalone: false,
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss'
})
export class MemberDetailsComponent implements OnInit {
  member!: Member;
  loading = true;
  fallbackAvatar = 'https://ui-avatars.com/api/?name=User&background=random';

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.memberService.getMember(id).subscribe({
        next: (data) => {
          this.member = data;
          this.fallbackAvatar = `https://ui-avatars.com/api/?name=${this.member?.firstName}+${this.member?.lastName}&background=random`;
          this.loading = false;
        },
        error: (err) => {
          this.snackBar.open('Error loading member details', 'Close', { duration: 5000, verticalPosition: 'top' });
          this.loading = false;
          console.log(err);
        }
      });
    }
  }

  goBack() {
    window.history.back();
  }

  editMember() {
    this.router.navigate(['/management/members', this.member.id, 'edit']);
  }

  confirmDelete() {
    const confirmed = confirm('Are you sure you want to delete this member?');
    if (confirmed) {
      this.memberService.deleteMember(this.member.id).subscribe({
        next: () => {
          this.snackBar.open('Member deleted successfully', 'OK', { duration: 5000, verticalPosition: 'top' });
          this.router.navigate(['management/members']);
        },
        error: () => {
          this.snackBar.open('Error deleting member', 'Close', { duration: 5000, verticalPosition: 'top' });
        }
      });
    }
  }
}
