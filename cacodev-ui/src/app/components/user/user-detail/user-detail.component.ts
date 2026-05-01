import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { NotificationService } from '../../../services/notification.service';
import { UserDTO } from '../../../models/auth.model';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  user!: UserDTO;
  loading = true;
  isToggling = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id).subscribe({
        next: (user) => {
          this.user = user;
          this.loading = false;
        },
        error: () => {
          this.notification.error('Failed to load user details');
          this.loading = false;
        }
      });
    }
  }

  toggleEnable(): void {
    if (!this.user) return;
    this.isToggling = true;

    this.userService.toggleEnable(this.user.id).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.notification.success(
          `User ${updatedUser.username} ${updatedUser.enabled ? 'enabled' : 'disabled'}`
        );
      },
      error: () => {
        this.notification.error('Failed to toggle user status');
      },
      complete: () => {
        this.isToggling = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/management/users']);
  }
}
