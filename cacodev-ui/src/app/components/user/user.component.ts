import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MemberService } from '../../services/member.service';
import { UserDTO, RegisterRequest } from '../../models/auth.model';
import { Member } from '../../models/Member';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<UserDTO>([]);
  displayedColumns: string[] = ['username', 'email', 'memberNumber', 'role', 'enabled', 'createdAt', 'actions'];
  isLoading = false;
  searchValue = '';
  togglingUserIds = new Set<string>();

  // Register dialog
  registerForm: FormGroup;
  members: Member[] = [];
  filteredMembers: Member[] = [];
  selectedMemberId = '';
  hidePassword = true;
  isRegistering = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('registerDialog') registerDialogTemplate!: TemplateRef<any>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private memberService: MemberService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      memberSearch: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm.get('memberSearch')?.valueChanges.subscribe(val => {
      if (typeof val === 'string') {
        this.selectedMemberId = '';
        this.filterMembers(val);
      }
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadMembers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users;
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load users', 'Close', { duration: 5000, panelClass: ['snackbar-error'] });
        this.isLoading = false;
      }
    });
  }

  toggleEnable(user: UserDTO): void {
    this.togglingUserIds.add(user.id);
    this.userService.toggleEnable(user.id).subscribe({
      next: (updatedUser) => {
        const index = this.dataSource.data.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.dataSource.data[index] = updatedUser;
          this.dataSource.data = [...this.dataSource.data];
        }
        this.snackBar.open(
          `User ${updatedUser.username} ${updatedUser.enabled ? 'enabled' : 'disabled'}`,
          'Close', { duration: 3000 }
        );
      },
      error: () => {
        this.snackBar.open('Failed to toggle user status', 'Close', { duration: 5000, panelClass: ['snackbar-error'] });
      },
      complete: () => {
        this.togglingUserIds.delete(user.id);
      }
    });
  }

  goToDetail(userId: string): void {
    this.router.navigate(['/management/users', userId]);
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (members) => this.members = members,
      error: () => {}
    });
  }

  onSearch(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  clearSearch(): void {
    this.searchValue = '';
    this.dataSource.filter = '';
  }

  // Autocomplete helpers
  filterMembers(search: string): void {
    const term = search.toLowerCase();
    this.filteredMembers = this.members.filter(m =>
      m.firstName.toLowerCase().includes(term) ||
      m.lastName.toLowerCase().includes(term) ||
      m.memberId.toLowerCase().includes(term)
    );
  }

  displayMember(member: Member): string {
    return member ? `${member.firstName} ${member.lastName} (${member.memberId})` : '';
  }

  onMemberSelected(event: MatAutocompleteSelectedEvent): void {
    const member: Member = event.option.value;
    this.selectedMemberId = member.id;
    // Pre-fill email if available
    if (member.email && !this.registerForm.get('email')?.value) {
      this.registerForm.patchValue({ email: member.email });
    }
  }

  openRegisterDialog(): void {
    this.registerForm.reset();
    this.selectedMemberId = '';
    this.hidePassword = true;
    this.dialog.open(this.registerDialogTemplate, { width: '480px' });
  }

  onRegister(): void {
    if (this.registerForm.invalid || !this.selectedMemberId) return;

    this.isRegistering = true;
    const request: RegisterRequest = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      memberId: this.selectedMemberId
    };

    this.authService.adminRegister(request).subscribe({
      next: () => {
        this.snackBar.open('User registered successfully!', 'Close', {
          duration: 4000, panelClass: ['snackbar-success']
        });
        this.dialog.closeAll();
        this.isRegistering = false;
        this.loadUsers();
      },
      error: (err) => {
        const message = err.error?.message || 'Registration failed. Please try again.';
        this.snackBar.open(message, 'Close', {
          duration: 5000, panelClass: ['snackbar-error']
        });
        this.isRegistering = false;
      }
    });
  }
}
