import { Gender } from "../enums/gender";

export interface MemberPersonalInfoUpdateRequest {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: Gender;
    email: string;
    phoneNumber: string;
}