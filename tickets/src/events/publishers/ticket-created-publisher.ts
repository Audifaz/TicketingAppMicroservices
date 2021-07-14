import { Publisher, Subjects, TicketCreatedEvent } from "@audifaztickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated=Subjects.TicketCreated;
}

