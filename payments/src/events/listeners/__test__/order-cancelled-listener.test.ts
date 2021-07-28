import { natsWrapper } from "../../../nats-wrapper"
import { OrderCancelledListener } from "../order-cancelled-listener";
import { OrderCancelledEvent, OrderStatus } from "@audifaztickets/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/order";

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        userId: 'fdsdf',
        price: 10,
        status: OrderStatus.Cancelled
    });
    await order.save()

    const data: OrderCancelledEvent['data']={
        id: order.id,
        version: 1,
        ticket: {
            id:'fsd'
        }
    }

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {listener,order, data, msg};
}


it('updates the status of the order', async () => {
    const {listener,order, data, msg} = await setup();

    await listener.onMessage(data,msg)

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
})

it('acks the message', async () => {
    const {listener, data, msg,order} = await setup();

    await listener.onMessage(data,msg)

    expect(msg.ack).toHaveBeenCalled();
})