import { EventStatus } from "../enums/eventStatus";

export interface EventUpdateStatusRequest {
    status: EventStatus;
    comments: string;
}