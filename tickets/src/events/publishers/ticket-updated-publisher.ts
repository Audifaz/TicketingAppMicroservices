import { Publisher, Subjects, TicketUpdatedEvent } from "@audifaztickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated=Subjects.TicketUpdated;
}

