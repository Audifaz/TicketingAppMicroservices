import { Publisher, OrderCancelledEvent, Subjects } from "@audifaztickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}