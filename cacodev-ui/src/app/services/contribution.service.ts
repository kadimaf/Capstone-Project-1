import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contribution } from '../models/Contribution';
import { ContributionCreateRequest } from '../models/ContributionCreateRequest';
import { ContributionStatus } from '../enums/contributionStatus';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  private baseApiUrl = 'http://localhost:8080/cacodev/api/contributions'

  constructor(
    private http: HttpClient
  ) {}

  getAllContributions(): Observable<Contribution[]> {
    return this.http.get<Contribution[]>(this.baseApiUrl);
  }

  createContribution(memberId: string, request: ContributionCreateRequest): Observable<Contribution> {
    const params = new HttpParams().set('memberId', memberId);
    return this.http.post<Contribution>(this.baseApiUrl, request, { params });
  }

  updateContributionStatus(id: string, status: ContributionStatus): Observable<Contribution> {
    return this.http.patch<Contribution>(`${this.baseApiUrl}/${id}`, { status });
  }

}
