import express, { json, urlencoded } from 'express';
import productsRouter from './routes/products/index.js';
import authRouter from './routes/auth/index.js';
import ordersRouter from './routes/orders/index.js';
import serverless from 'serverless-http';

const port = 3000;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);

if (process.env.NODE_ENV === 'dev') {
  app.listen(port, () => {
    console.log(`Example app listening to port ${port}`);
  });
}

export const handler = serverless(app);
