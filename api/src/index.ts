import express, { Router } from 'express';
import productsRouter from './routes/products';

const port = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Example app listening to port ${port}`);
});
