import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../db';
import { productsTable } from '../../db/productsSchema';

export async function listProduct(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).json({ message: 'Product not found!' });
    } else {
      res.json(product);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedFields = req.cleanBody;

    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, Number(id)))
      .returning();
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product was not found!' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(product);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(id)))
      .returning();
    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Product not found!' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
