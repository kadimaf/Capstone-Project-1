import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { MemberService } from '../../../services/member.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../../../services/event.service';
import { EventAddParticipantRequest } from '../../../models/EventAddParticipantRequest';

@Component({
  selector: 'app-add-participant-dialog',
  standalone: false,
  templateUrl: './add-participant-dialog.component.html',
  styleUrl: './add-participant-dialog.component.scss'
})
export class AddParticipantDialogComponent implements OnInit {
  memberControl = new FormControl('');
  filteredMembers$!: Observable<any[]>;
  members: any[] = [];
  selectedMemberId!: string;
  eventId!: string;

  constructor(
    public dialogRef: MatDialogRef<AddParticipantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string },
    private memberService: MemberService,
    private snackBar: MatSnackBar,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
      this.eventId = this.data.eventId;
      this.filteredMembers$ = this.memberControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterMembers(value ?? ''))
      );
    });
  }

  private filterMembers(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.members.filter(m =>
      `${m.firstName} ${m.lastName} (${m.memberId})`.toLowerCase().includes(filterValue)
    );
  }

  onMemberSelected(memberId: string): void {
    this.selectedMemberId = memberId;
  }

  onSubmit(): void {
    if (!this.selectedMemberId) {
      this.snackBar.open('Please select a member to add.', 'Close', {
        duration: 5000,
        panelClass: 'snackbar-error'
      });
      return;
    }
  
    const request: EventAddParticipantRequest = {
      participantId: this.selectedMemberId
    };
    console.log('this.eventId:', this.eventId);
    console.log('this.selectedMemberId:', this.selectedMemberId);
  
    this.eventService.addParticipant(this.eventId, request).subscribe({
      next: () => {
        this.snackBar.open('Participant added successfully!', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'snackbar-success'
        });
        this.dialogRef.close('refresh');
      },
      error: () => {
        this.snackBar.open('Failed to add participant.', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'snackbar-error'
        });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
