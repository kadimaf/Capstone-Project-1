import { Component } from '@angular/core';
import { MemberType } from '../../../models/MemberType';
import { MemberTypeService } from '../../../services/member-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-member-type',
  standalone: false,
  templateUrl: './member-type.component.html',
  styleUrl: './member-type.component.scss'
})
export class MemberTypeComponent {
  memberTypes: MemberType[] = [];

  constructor(
    private service: MemberTypeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllMemberTypes();
  }

  getAllMemberTypes() {
    this.service.getMemberTypes().subscribe(data => {
      this.memberTypes = data;
    });
  }

  togglingMemberIds = new Set<string>();

  toggleEnable(type: MemberType): void {
    this.togglingMemberIds.add(type.id);

    this.service.enableDisableMemberType(type.id).subscribe({
      next: (updatedMember) => {
        const index = this.memberTypes.findIndex(m => m.id === type.id);
        if (index !== -1) {
          this.memberTypes[index] = updatedMember;
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
        this.memberTypes = this.memberTypes.filter(m => m.id !== id);

        this.snackBar.open('Member type deleted successfully', 'OK', { duration: 5000, verticalPosition: 'top' });
        console.log('Member type deleted successfully');
      },
      error: (err) => {
        console.error('Error occurred while atttempting delete member type: ', err);
      }
    });

  }

}
