export interface MemberTypeUpdateRequest {
    membershipFee: number;
    membershipDurationMonths: number;
    hasVotingRights: boolean;
    privileges: string;
}