import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { capitalizeFirstLetter } from '../../util/string.utils';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  currentDateTime: Date = new Date();
  userName: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.currentDateTime = new Date();
    if (user) {
      this.userName = capitalizeFirstLetter(user.username);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
