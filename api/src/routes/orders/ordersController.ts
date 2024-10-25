import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { orderItemsTable, ordersTable } from '../../db/ordersSchema.js';
import { eq } from 'drizzle-orm';

export async function createOrder(req: Request, res: Response) {
  try {
    const { order, items } = req.cleanBody;
    const userId = Number(req.userId);
    if (!userId) {
      res.status(400).json({ error: 'Invalid order data' });
      return;
    }

    const [newOrder] = await db
      .insert(ordersTable)
      .values({ userId })
      .returning();

    // TODO: validate product ids and take their actual price from db
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));

    await db.insert(orderItemsTable).values(orderItems).returning();

    res.status(201).json({ ...newOrder, items: orderItems });
  } catch (e) {
    res.status(400).json({ error: 'Invalid order data' });
  }
}

// if req.role is admin return all orders
// if req.rol is seller, return orders by sellerId
// else, return only orders filtered by req.userId
export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await db.select().from(ordersTable);
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const orderItems = await db
      .select()
      .from(ordersTable)
      .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId))
      .where(eq(ordersTable.id, id));

    if (!orderItems.length) {
      res.status(400).json({ error: 'Order not found' });
    }

    const mergedOrders = {
      ...orderItems[0].orders,
      items: orderItems[0].order_items
        ? orderItems.map((oi) => oi.order_items)
        : [],
    };
    console.log(orderItems);
    res.json(mergedOrders);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateOrder(req: Request, res: Response) {}
