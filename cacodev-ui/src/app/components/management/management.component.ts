import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { MemberTypeService } from '../../services/member-type.service';
import { ContributionService } from '../../services/contribution.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-management',
  standalone: false,
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss'
})
export class ManagementComponent implements OnInit {
  memberCount = 0;
  memberTypeCount = 0;
  contributionCount = 0;
  isAdmin = false;

  constructor(
    private memberService: MemberService,
    private memberTypeService: MemberTypeService,
    private contributionService: ContributionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin) {
      this.memberService.getMembers().subscribe(data => this.memberCount = data.length);
      this.memberTypeService.getMemberTypes().subscribe(data => this.memberTypeCount = data.length);
      this.contributionService.getAllContributions().subscribe(data => this.contributionCount = data.length);
    }
  }
}
