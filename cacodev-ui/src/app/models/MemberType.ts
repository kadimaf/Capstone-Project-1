export interface MemberType {
    id: string;
    name: string;
    description: string;
    membershipFee: number;
    membershipDurationMonths: number;
    hasVotingRights: boolean;
    memberRole: string;
    privileges: string;
    isActive: boolean;
}