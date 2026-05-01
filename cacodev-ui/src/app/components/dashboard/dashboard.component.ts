import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/Member';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  members: Member[] = [];
  allActiveMembers: Member[] = [];
  allInactiveMembers: Member[] = [];

  totalMembers = 0;
  activeMembers = 0;
  inactiveMembers = 0;
  upcomingActivities = 0;

  memberStats = {
    total: 0,
    active: 0,
    newThisMonth: 0,
    expiringSoon: 0
  };

  contributionStats = {
    totalAmount: 0,
    donationsThisMonth: 0,
    recurringDonors: 0,
    averageDonation: 0
  };

  upcomingEvents: any = [];
  recentContributions: any = [];

  constructor(
    private memberService: MemberService
  ) {}

  ngOnInit(): void {

    this.getMembers();
    this.getActiveMembers();
    this.getInactiveMembers();

    this.totalMembers = this.members.length;
    this.activeMembers = this.allActiveMembers.length;
    this.inactiveMembers = this.allInactiveMembers.length;
    this.upcomingActivities = 5;

    this.loadMemberStats();
    this.loadContributionStats();
    this.loadUpcomingEvents();
    this.loadRecentContributions();
  }

  private loadMemberStats(): void {
    this.memberStats = {
      total: 247,
      active: 218,
      newThisMonth: 15,
      expiringSoon: 12
    };
  }

  getMembers() {
    this.memberService.getMembers().subscribe({
      next: (data) => {
        this.members = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  getActiveMembers() {
    this.memberService.getActiveMembers().subscribe({
      next: (data) => {
        this.allActiveMembers = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  getInactiveMembers() {
    this.memberService.getInactiveMembers().subscribe({
      next: (data) => {
        this.allInactiveMembers = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private loadContributionStats(): void {
    this.contributionStats = {
      totalAmount: 45750,
      donationsThisMonth: 24,
      recurringDonors: 37,
      averageDonation: 187.50
    };
  }

  private loadUpcomingEvents(): void {
    this.upcomingEvents = [
      { id: 1, title: 'Spring Fundraising Gala', date: '2025-04-25', attendees: 76 },
      { id: 2, title: 'Volunteer Training Session', date: '2025-04-18', attendees: 12 },
      { id: 3, title: 'Board Meeting', date: '2025-04-20', attendees: 8 }
    ];
  }

  private loadRecentContributions(): void {
    this.recentContributions = [
      { id: 101, member: 'Sarah Johnson', amount: 250, date: '2025-04-11', type: 'Monetary' },
      { id: 102, member: 'David Lee', amount: 500, date: '2025-04-10', type: 'Monetary' },
      { id: 103, member: 'Maria Garcia', amount: null, date: '2025-04-09', type: 'Volunteer (5 hrs)' }
    ];
  }
}
