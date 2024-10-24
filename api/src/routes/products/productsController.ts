import { Request, Response } from 'express';

export function listProduct(req: Request, res: Response) {
  res.send('listProduct');
}

export function getProductById(req: Request, res: Response) {
  res.send('getProductById');
}

export function updateProduct(req: Request, res: Response) {
  res.send('updateProduct');
}

export function createProduct(req: Request, res: Response) {
  console.log(req.body);
  res.send('createProduct');
}

export function deleteProduct(req: Request, res: Response) {
  res.send('deleteProduct');
}
