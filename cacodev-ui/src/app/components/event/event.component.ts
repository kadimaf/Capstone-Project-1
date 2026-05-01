import { Component } from '@angular/core';
import { AddEventDialogComponent } from '../events/add-event-dialog/add-event-dialog.component';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { Event } from '../../models/Event';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event',
  standalone: false,
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

  events: Event[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe((events) => {
      this.events = events;
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/events', id]);
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


  openAddEventDialog(): void {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.loadEvents(); // 👈 Re-fetch events when dialog says "refresh"
      }
    });
  }

}
