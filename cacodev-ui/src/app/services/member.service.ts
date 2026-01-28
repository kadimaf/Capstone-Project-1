import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/Member';
import { MemberAddRequest } from '../models/MemberAddRequest';
import { MemberPersonalInfoUpdateRequest } from '../models/MemberPersonalInfoUpdateRequest';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'http://localhost:8080/cacodev/api/members'

  constructor(
    private http: HttpClient
  ) {}

  // Get all members
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  addMember(request: MemberAddRequest): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, request);
  }

  // Get member by id
  getMember(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  deleteMember(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  enableDisableMember(id: string): Observable<Member> {
    return this.http.patch<Member>(`${this.apiUrl}/${id}/toggle-enable`, {});
  }

  updatePersonalInfo(request: MemberPersonalInfoUpdateRequest, id: string): Observable<Member> {
    return this.http.patch<Member>(`${this.apiUrl}/${id}/update-personal-information`, request);
  }

  getActiveMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/active`);
  }

  getMemberByDateOfBirth(dob: string): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/date-of-birth/${dob}`);
  }

  deleteByMemberId(memberId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-by-member-id/${memberId}`);
  }

  getExpiredMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/expired`);
  }

  getMemberByEmail(email: string): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/find-by-email/${email}`);
  }

  getMemberByMemberId(memberId: string): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/find-by-member-id/${memberId}`);
  }

  getInactiveMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/inactive`);
  }
}