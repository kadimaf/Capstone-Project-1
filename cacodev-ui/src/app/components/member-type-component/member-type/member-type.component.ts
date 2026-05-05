import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MemberType } from '../../../models/MemberType';
import { MemberTypeService } from '../../../services/member-type.service';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-member-type',
  standalone: false,
  templateUrl: './member-type.component.html',
  styleUrl: './member-type.component.scss'
})
export class MemberTypeComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<MemberType>([]);
  displayedColumns: string[] = ['name', 'description', 'membershipDurationMonths', 'membershipFee', 'status', 'actions'];
  isLoading = false;
  searchValue = '';
  isAdmin = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: MemberTypeService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.getAllMemberTypes();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item: MemberType, property: string) => {
      switch (property) {
        case 'status': return item.isActive ? 'Active' : 'Inactive';
        default: return (item as any)[property];
      }
    };
  }

  getAllMemberTypes() {
    this.isLoading = true;
    this.service.getMemberTypes().subscribe({
      next: (data) => this.dataSource.data = data,
      complete: () => this.isLoading = false,
      error: () => this.isLoading = false
    });
  }

  togglingMemberIds = new Set<string>();

  toggleEnable(type: MemberType): void {
    this.togglingMemberIds.add(type.id);

    this.service.enableDisableMemberType(type.id).subscribe({
      next: (updatedType) => {
        const index = this.dataSource.data.findIndex(m => m.id === type.id);
        if (index !== -1) {
          this.dataSource.data[index] = updatedType;
          this.dataSource.data = [...this.dataSource.data];
        }
      },
      error: (err) => {
        console.error('Error toggling type:', err);
      },
      complete: () => {
        this.togglingMemberIds.delete(type.id);
      }
    });
  }

  deleteMemberType(id: string) {
    const confirmed = confirm('Are you sure you want to delete this member type?');
    if (!confirmed) return;

    this.service.deleteMemberType(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(m => m.id !== id);
        this.snackBar.open('Member type deleted successfully', 'OK', { duration: 5000, verticalPosition: 'top' });
      },
      error: (err) => {
        console.error('Error occurred while attempting delete member type: ', err);
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
