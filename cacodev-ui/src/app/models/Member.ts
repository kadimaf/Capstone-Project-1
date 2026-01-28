import { MemberType } from "./MemberType";

export interface Member {
    id: string;
    memberId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    joinDate: string;
    memberType: MemberType;
    membershipExpiryDate: string;
    active: boolean;
}