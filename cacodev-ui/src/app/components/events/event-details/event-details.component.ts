import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/Event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventStatus } from '../../../enums/eventStatus';
import { EventUpdateDescriptionRequest } from '../../../models/EventUpdateDescriptionRequest';
import { EventUpdateStatusRequest } from '../../../models/EventUpdateStatusRequest';
import { AddParticipantDialogComponent } from '../add-participant-dialog/add-participant-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EventAddParticipantRequest } from '../../../models/EventAddParticipantRequest';

@Component({
  selector: 'app-event-details',
  standalone: false,
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit {
  eventId!: string;
  event!: Event;
  loading: boolean = true;
  contributionStatuses = Object.values(EventStatus);
  selectedStatus!: EventStatus;
  description: string = '';
  comments: string = '';
  memberId: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    // this.getEventDetails();
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe({
        next: (data) => {
          this.event = data;
          this.description = data.description;
          this.comments = data.comments;
          this.selectedStatus = data.status;
          this.memberId = data.id;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  updateDescription(): void {
    const request: EventUpdateDescriptionRequest = {
      description: this.description
    };
    
    this.eventService.updateDescription(this.event.id, request).subscribe({
      next: () => {
        console.log('request: ', request);
        this.snackBar.open('Description updated successfully!', 'Close', { 
          duration: 7000, 
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'snackbar-success' 
        });
      },
      error: () => this.snackBar.open('Failed to update description', 'Close', { 
        duration: 7000, 
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-error' })
    });
  }

  updateStatus(): void {
    const request: EventUpdateStatusRequest = {
      status: this.selectedStatus,
      comments: this.comments
    };
    this.eventService.updateStatus(this.event.id, request).subscribe({
      next: (evt) => {
        console.log('this.comments: ', this.comments);
        this.snackBar.open('Status updated successfully', 'Close', { 
          duration: 7000, 
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'snackbar-success' 
        })
      },
      error: () => this.snackBar.open('Failed to update status', 'Close', { 
        duration: 7000, 
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-error' })
    });
  }


  openAddParticipantDialog(): void {

    const dialogRef = this.dialog.open(AddParticipantDialogComponent, {
      width: '600px',
      height: '400px',
      data: { eventId: this.event.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.refreshEvent();
      }
    });
  }

  refreshEvent(): void {
    this.eventService.getEventById(this.event.id).subscribe({
      next: (event) => {
        this.event = event;
      },
      error: () => {
        this.snackBar.open('Failed to refresh event details', 'Close', {
          duration: 5000,
          panelClass: 'snackbar-error'
        });
      }
    });
  }
  

  updateEvent(): void {
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'check_circle';
      case 'scheduled':
        return 'event';
      case 'started':
        return 'hourglass_empty';
      case 'cancelled':
      case 'failed':
        return 'cancel';
      default:
        return 'info';
    }
  }
}
