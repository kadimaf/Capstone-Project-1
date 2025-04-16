import { Gender } from '../enums/gender';

export interface MemberAddRequest {
    firstName: string
    middleName: string
    lastName: string
    gender: Gender
    email: string
    phoneNumber: string
    dateOfBirth: string
    memberTypeId: string
}