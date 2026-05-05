import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Contribution } from '../../../models/Contribution';
import { ContributionService } from '../../../services/contribution.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddContributionDialogComponent } from '../add-contribution-dialog/add-contribution-dialog.component';
import { ContributionStatus } from '../../../enums/contributionStatus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-contribution',
  standalone: false,
  templateUrl: './contribution.component.html',
  styleUrl: './contribution.component.scss'
})
export class ContributionComponent implements OnInit, AfterViewInit {

  displayedColumns = ['memberId', 'fullName', 'amount', 'type', 'status', 'date'];
  contributionStatuses = Object.values(ContributionStatus);
  memberNameMap: Map<string, string> = new Map();
  isLoading = true;
  searchValue = '';

  dataSource = new MatTableDataSource<Contribution>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private contributionService: ContributionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.fetchContributions();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onSearch(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearch(): void {
    this.searchValue = '';
    this.dataSource.filter = '';
  }

  openAddContributionDialog(): void {
    const dialogRef = this.dialog.open(AddContributionDialogComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.fetchContributions();
      }
    });
  }

  fetchContributions(): void {
    this.isLoading = true;
    this.contributionService.getAllContributions().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        data.forEach(c => this.getMemberFullName(c.memberId));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching contributions', err);
        this.isLoading = false;
      }
    });
  }

  onStatusChange(id: string, newStatus: ContributionStatus): void {
    this.contributionService.updateContributionStatus(id, newStatus).subscribe({
      next: updated => {
        const index = this.dataSource.data.findIndex(c => c.id === id);
        if (index !== -1) {
          this.dataSource.data[index].status = updated.status;
        }

        this.snackBar.open(`Status updated to '${updated.status}'`, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
      },
      error: err => console.error('Failed to update status', err)
    });
  }

  getMemberFullName(memberId: string): void {
    if (this.memberNameMap.has(memberId)) return;

    this.memberService.getMemberByMemberId(memberId).subscribe(member => {
      const fullName = `${member.firstName} ${member.lastName}`;
      this.memberNameMap.set(memberId, fullName);
    });
  }
}
