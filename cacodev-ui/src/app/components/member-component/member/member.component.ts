import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Member } from '../../../models/Member';
import { MemberService } from '../../../services/member.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-member-list',
  standalone: false,
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit, AfterViewInit {
  members: Member[] = [];
  dataSource = new MatTableDataSource<Member>([]);
  displayedColumns: string[] = ['memberId', 'firstName', 'middleName', 'lastName', 'memberType', 'joinDate', 'status', 'actions'];
  currentFilter: string = 'all';
  isLoading = false;
  searchValue = '';
  isAdmin = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: MemberService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.getAllMembers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item: Member, property: string) => {
      switch (property) {
        case 'memberType': return item.memberType.name;
        case 'status': return item.active ? 'Active' : 'Inactive';
        default: return (item as any)[property];
      }
    };
  }

  getAllMembers() {
    this.isLoading = true;
    this.service.getMembers().subscribe({
      next: (data) => {
        this.members = data;
        this.dataSource.data = data;
      },
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false
    });
  }

  onFilterChange(event: any): void {
    this.searchValue = '';
    this.dataSource.filter = '';
    switch (this.currentFilter) {
      case 'all':
        this.getAllMembers();
        break;
      case 'active':
        this.filterByActiveMembers();
        break;
      case 'inactive':
        this.filterByInactiveMembers();
        break;
      case 'expired':
        this.filterByExpiredMembers();
        break;
      default:
        this.dataSource.data = this.members;
    }
  }

  filterByInactiveMembers() {
    this.isLoading = true;
    this.service.getInactiveMembers().subscribe({
      next: (data) => this.dataSource.data = data,
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false
    });
  }

  filterByActiveMembers() {
    this.isLoading = true;
    this.service.getActiveMembers().subscribe({
      next: (data) => this.dataSource.data = data,
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false
    });
  }

  filterByExpiredMembers() {
    this.isLoading = true;
    this.service.getExpiredMembers().subscribe({
      next: (data) => this.dataSource.data = data,
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false
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
        this.members = this.members.filter(m => m.id !== id);
        this.dataSource.data = this.dataSource.data.filter(m => m.id !== id);
        this.snackBar.open('Member deleted successfully', 'OK', { duration: 5000, verticalPosition: 'top' });
      },
      error: (err) => {
        console.error('Error occurred while attempting delete: ', err);
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
        const dsIndex = this.dataSource.data.findIndex(m => m.id === member.id);
        if (dsIndex !== -1) {
          this.dataSource.data[dsIndex] = updatedMember;
          this.dataSource.data = [...this.dataSource.data];
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
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearch() {
    this.searchValue = '';
    this.dataSource.filter = '';
  }
}
