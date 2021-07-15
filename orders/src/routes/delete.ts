import express, {Request, Response} from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@audifaztickets/common';
import { Order, OrderStatus } from '../models/order';


const router = express.Router();

router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
    const {orderId} = req.params;

    const order = await Order.findById(orderId);

    if(!order){
        throw new NotFoundError();
    }

    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    //publish an event that notifies the cancelation

    res.status(204).send(order);
});

export {router as deleteOrderRouter};