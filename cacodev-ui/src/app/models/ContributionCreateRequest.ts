import { ContributionType } from "../enums/contributionType";


export interface ContributionCreateRequest {
    amount: number;
    description: string;
    type: ContributionType
}