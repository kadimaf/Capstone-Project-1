import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberType } from '../models/MemberType';
import { MemberTypeCreateRequest } from '../models/MemberTypeCreateRequest';
import { MemberRole } from '../enums/memberRole';
import { MemberTypeUpdateRequest } from '../models/MemberTypeUpdateRequest';

@Injectable({
  providedIn: 'root'
})
export class MemberTypeService {

  private apiUrl = 'http://localhost:8080/cacodev/api/member-types';

  constructor(
    private http: HttpClient
  ) {}

  // Get all member types
  getMemberTypes(): Observable<MemberType[]> {
    return this.http.get<MemberType[]>(this.apiUrl);
  }

  // Get member type by ID
  getMemberType(id: string): Observable<MemberType> {
    return this.http.get<MemberType>(`${this.apiUrl}/${id}`);
  }

  getMemberTypeByName(name: string): Observable<MemberType> {
    return this.http.get<MemberType>(`${this.apiUrl}/${name}/find-by-name`);
  }

  getMemberTypeByRole(role: MemberRole): Observable<MemberType[]> {
    return this.http.get<MemberType[]>(`${this.apiUrl}/get-by-role`, { params: {role} });
  }

  enableDisableMemberType(id: string): Observable<MemberType> {
    return this.http.patch<MemberType>(`${this.apiUrl}/${id}/toggle-enable`, {});
  }

  createMemberType(request: MemberTypeCreateRequest): Observable<MemberType> {
    return this.http.post<MemberType>(this.apiUrl, request);
  }

  updateMemberType(id: string, request: MemberTypeUpdateRequest): Observable<MemberType> {
    return this.http.patch<MemberType>(`${this.apiUrl}/${id}/update`, request);
  }

  updateMemberTypeDescription(id: string, newDescription: string): Observable<MemberType> {
    return this.http.patch<MemberType>(`${this.apiUrl}/${id}/update-description`, { newDescription });
  }

  deleteMemberType(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
