import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { ContributionService } from '../../services/contribution.service';
import { EventService } from '../../services/event.service';
import { Member } from '../../models/Member';
import { Contribution } from '../../models/Contribution';
import { Event } from '../../models/Event';
import { AuthService } from '../../services/auth.service';
import { capitalizeFirstLetter } from '../../util/string.utils';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  isLoading = true;
  userName = '';

  // Stats
  totalMembers = 0;
  activeMembers = 0;
  inactiveMembers = 0;
  totalContributions = 0;
  totalContributionAmount = 0;
  upcomingEventsCount = 0;

  // Data
  recentContributions: Contribution[] = [];
  upcomingEvents: Event[] = [];
  memberNameMap = new Map<string, string>();

  constructor(
    private memberService: MemberService,
    private contributionService: ContributionService,
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.userName = capitalizeFirstLetter(user?.username || 'Admin');

    this.loadMembers();
    this.loadContributions();
    this.loadEvents();
  }



  private loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (members) => {
        this.totalMembers = members.length;
        this.activeMembers = members.filter(m => m.active).length;
        this.inactiveMembers = members.filter(m => !m.active).length;
        members.forEach(m => this.memberNameMap.set(m.memberId, `${m.firstName} ${m.lastName}`));
        this.checkLoading();
      },
      error: () => this.checkLoading()
    });
  }

  private loadContributions(): void {
    this.contributionService.getAllContributions().subscribe({
      next: (contributions) => {
        this.totalContributions = contributions.length;
        this.totalContributionAmount = contributions.reduce((sum, c) => sum + (c.amount || 0), 0);
        // Sort by date descending, take 5 most recent
        this.recentContributions = contributions
          .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
          .slice(0, 5);
        this.checkLoading();
      },
      error: () => this.checkLoading()
    });
  }

  private loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        const now = new Date();
        this.upcomingEvents = events
          .filter(e => e.status === 'SCHEDULED' || new Date(e.dateTime) > now)
          .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
          .slice(0, 5);
        this.upcomingEventsCount = this.upcomingEvents.length;
        this.checkLoading();
      },
      error: () => this.checkLoading()
    });
  }

  private pendingLoads = 3;
  private checkLoading(): void {
    this.pendingLoads--;
    if (this.pendingLoads <= 0) {
      this.isLoading = false;
    }
  }

  getMemberName(memberId: string): string {
    return this.memberNameMap.get(memberId) || memberId;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
