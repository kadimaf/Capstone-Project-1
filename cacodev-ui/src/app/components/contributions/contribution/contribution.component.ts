import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Contribution } from '../../../models/Contribution';
import { ContributionService } from '../../../services/contribution.service';
import { MatSort } from '@angular/material/sort';
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
export class ContributionComponent implements AfterViewInit {
  
  contributions: Contribution[] = [];
  displayedColumns = ['memberId', 'fullName', 'amount', 'type', 'status', 'date'];
  contributionStatuses = Object.values(ContributionStatus);
  memberNameMap: Map<string, string> = new Map();
  loading: boolean = true;

  dataSource = new MatTableDataSource<Contribution>();

  @ViewChild(MatSort) sort!: MatSort;

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
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddContributionDialog(): void {
    const dialogRef = this.dialog.open(AddContributionDialogComponent, {
      width: '600px',
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.fetchContributions(); // reload contributions
      }
    });
  }

  fetchContributions(): void {
    this.contributionService.getAllContributions().subscribe({
      next: (data) => {
        // this.contributions = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        data.forEach(c => this.getMemberFullName(c.memberId));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching contributions', err);
      }
    });
  }

  onStatusChange(id: string, newStatus: ContributionStatus): void {
    this.contributionService.updateContributionStatus(id, newStatus).subscribe({
      next: updated => {
        const index = this.contributions.findIndex(c => c.id === id);
        if (index !== -1) this.contributions[index].status = updated.status;

        this.snackBar.open(`Status updated successfully to '${updated.status}'`, 'Close', {
          duration: 7000, 
          verticalPosition: 'top', 
          panelClass: ['snackbar-success']
        });
        
        console.log(`Status updated successfully to: '${updated.status}'`);
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
