import { MemberRole } from "../enums/memberRole";

export interface MemberTypeCreateRequest {
    name: string;
    description: string;
    membershipFee: number;
    membershipDurationMonths: number;
    hasVotingRights: boolean;
    memberRole: MemberRole;
    privileges: string;
}