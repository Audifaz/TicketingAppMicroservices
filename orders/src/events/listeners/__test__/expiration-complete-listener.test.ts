import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { ExpirationCompleteEvent, OrderStatus } from "@audifaztickets/common";
import mongoose from 'mongoose'
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { Order } from "../../../models/order";

const setup = async () => {
    const listener = new ExpirationCompleteListener(natsWrapper.client)
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });

    await ticket.save()
    const order = Order.build({
        status: OrderStatus.Created,
        userId: 'hsadl',
        expiresAt: new Date(),
        ticket,
    });

    await order.save();

    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id,
    }
    //Create a fake msg objt
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {listener, msg, order, ticket, data};
};

it('updates the order stauts to cancelled', async () => {
    const {msg, data, ticket, listener, order} = await setup();
    await listener.onMessage(data,msg);
    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emit and OrderCancelled event', async () => {
    const {msg, data, ticket, listener, order} = await setup();
    await listener.onMessage(data,msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled

    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])

    expect(eventData.id).toEqual(order.id)
});

it('ack the message', async () => {
    const {msg, data, ticket, listener, order} = await setup();
    await listener.onMessage(data,msg);

    expect(msg.ack).toHaveBeenCalled();
});