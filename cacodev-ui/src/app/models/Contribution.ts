export interface Contribution {
    id?: string;
    memberId: string;
    mbrId?: string;
    amount: number;
    description: string;
    type: string;
    status?: string;
    date?: string;
}