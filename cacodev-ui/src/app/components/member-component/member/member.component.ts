import { Component } from '@angular/core';
import { Member } from '../../../models/Member';
import { MemberService } from '../../../services/member.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-member-list',
  standalone: false,
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {
  members: Member[] = [];
  filteredMembers: Member[] = [];
  showActiveMembers: boolean = true;
  currentFilter: string = 'all';  // Default filter to show all members

  constructor(
    private service: MemberService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllMembers();

  }

  getAllMembers() {
    this.service.getMembers().subscribe((data) => {
      this.members = data;
      this.filteredMembers = data;
    });
  }

  onFilterChange(event: any): void {
    switch (this.currentFilter) {
      case 'all':
        this.getAllMembers();  // Show all members
        break;
      case 'active':
        this.filterByActiveMembers();  // Show active members only
        break;
      case 'inactive':
        this.filterByInactiveMembers();  // Show inactive members only
        break;
      case 'expired':
        const today = new Date();
        this.filterByExpiredMembers();  // Show expired members only
        break;
      default:
        this.filteredMembers = this.members;  // Default to show all members
    }
  }

  filterByInactiveMembers() {
    this.service.getInactiveMembers().subscribe((data) => {
      this.filteredMembers = data;
    });
  }

  filterByActiveMembers() {
    this.service.getActiveMembers().subscribe((data) => {
      this.filteredMembers = data;
    });
  }

  filterByExpiredMembers() {
    this.service.getExpiredMembers().subscribe((data) => {
      this.filteredMembers = data;
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['/management/members', id]);
  }

  goToAddMember() {
    this.router.navigate(['management/members/add']);
  }

  deleteMember(id: string) {
    const confirmed = confirm('Are you sure you want to delete this member?');

    if (!confirmed) return;

    this.service.deleteMember(id).subscribe({
      next: () => {
        this.filteredMembers = this.filteredMembers.filter(m => m.id !== id);
        this.snackBar.open('Member deleted successfully', 'OK', { duration: 5000, verticalPosition: 'top' });
        console.log('Member deleted successfully');
      },
      error: (err) => {
        console.error('Error occurred while atttempting delete: ', err);
      }
    });
  }

  togglingMemberIds = new Set<string>();

  toggleEnable(member: Member): void {
    this.togglingMemberIds.add(member.id);

    this.service.enableDisableMember(member.id).subscribe({
      next: (updatedMember) => {
        const index = this.members.findIndex(m => m.id === member.id);
        if (index !== -1) {
          this.members[index] = updatedMember;
        }
      },
      error: (err) => {
        console.error('Error toggling member:', err);
      },
      complete: () => {
        this.togglingMemberIds.delete(member.id);
      }
    });
  }

  onSearch(value: string) {
    const searchTerm = value.toLowerCase();
    this.filteredMembers = this.members.filter(m =>
      `${m.firstName} ${m.lastName}`.toLowerCase().includes(searchTerm) ||
      m.email.toLowerCase().includes(searchTerm) ||
      m.phoneNumber.toLowerCase().includes(searchTerm)
    );
  }
}
