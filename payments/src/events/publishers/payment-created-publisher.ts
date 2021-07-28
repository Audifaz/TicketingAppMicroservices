import { Subjects, Publisher, PaymentCreatedEvent } from "@audifaztickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated= Subjects.PaymentCreated;
}