import { EventStatus } from "../enums/eventStatus";
import { Participant } from "./Participant";

export interface Event {
    id: string;
    title: string;
    organizerId: string;
    memberId: string;
    description: string;
    dateTime: string;
    location: string;
    status: EventStatus;
    participants: Participant[];
    comments: string;
}