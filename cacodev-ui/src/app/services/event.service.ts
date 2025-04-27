import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/Event';
import { EventStatus } from '../enums/eventStatus';
import { EventUpdateStatusRequest } from '../models/EventUpdateStatusRequest';
import { EventUpdateDescriptionRequest } from '../models/EventUpdateDescriptionRequest';
import { EventAddParticipantRequest } from '../models/EventAddParticipantRequest';

@Injectable({
  providedIn: 'root'
})
export class EventService implements OnInit {

  private apiUrl = 'http://localhost:8080/cacodev/api/events'

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  updateDescription(id: string, request: EventUpdateDescriptionRequest): Observable<Event> {
    // const params = new HttpParams().set('description', request);
    return this.http.patch<Event>(`${this.apiUrl}/${id}/update-description`, request);
  }

  updateStatus(id: string, request: EventUpdateStatusRequest): Observable<Event> {
    return this.http.patch<Event>(`${this.apiUrl}/${id}/update-status`, request);
  }

  addParticipant(eventId: string, request: EventAddParticipantRequest): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/${eventId}/participants`, request);
  }
  
}
