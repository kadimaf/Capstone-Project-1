import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventStatus } from '../../../enums/eventStatus';
import { EventService } from '../../../services/event.service';
import { Member } from '../../../models/Member';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-add-event-dialog',
  standalone: false,
  templateUrl: './add-event-dialog.component.html',
  styleUrl: './add-event-dialog.component.scss'
})
export class AddEventDialogComponent {
  eventForm: FormGroup;
  members: Member[] = [];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private memberService: MemberService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.eventForm = this.fb.group({
      organizerId: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (members) => this.members = members,
      error: () => this.snackBar.open('Failed to load members', 'Close', { duration: 5000 })
    });
  }

  submit(): void {
    if (this.eventForm.invalid) return;

    const date: Date = this.eventForm.value.date;
    const time: string = this.eventForm.value.time; // "HH:mm" format

    // Combine date and time into one LocalDateTime
    const [hours, minutes] = time.split(':').map(Number);
    const combinedDateTime = new Date(date);
    combinedDateTime.setHours(hours);
    combinedDateTime.setMinutes(minutes);

    const request = {
      organizerId: this.eventForm.value.organizerId,
      title: this.eventForm.value.title,
      description: this.eventForm.value.description,
      dateTime: combinedDateTime.toISOString(),
      location: this.eventForm.value.location
    };

    this.eventService.createEvent(request).subscribe({
      next: () => {
        this.snackBar.open('Event created successfully!', 'Close', {
          duration: 7000,
          verticalPosition: 'top',
          panelClass: 'snackbar-success'
        });
        this.dialogRef.close('refresh');
      },
      error: () => {
        this.snackBar.open('Failed to create event', 'Close', {
          duration: 7000,
          verticalPosition: 'top',
          panelClass: 'snackbar-error'
        });
      }
    });
  }
}
