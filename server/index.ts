import next from 'next';
import express, { Request, Response, NextFunction } from 'express';

import orderRoutes from './routes/order';
import authRoutes from './routes/auth';
import customerRoutes from './routes/customer';
import productRoutes from './routes/product';

const port = parseInt(process.env.PORT!, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.get('*', (req, res) => {
     return handle(req, res);
  });

  server.use('/auth', authRoutes);
  server.use('/products', productRoutes);
  server.use('/customers', customerRoutes);
  server.use('/orders', orderRoutes);
  
  server.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    
    res.status(status).json({ message: message, data: data });
  });

  // server.get('/a', (req, res) => {
  //   return app.render(req, res, '/a', req.query)
  // })

  // server.all('*', (req, res) => {
  //   return handle(req, res)
  // })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  });


  // tslint:disable-next-line:no-console
  // postgres://dziorrtsguzlrx:fb1ebdc5c788dc725590d868190a67a5e54e5bba6562aad55de6ed9dd011d339@ec2-52-50-171-4.eu-west-1.compute.amazonaws.com:5432/df4b4f0fn34sfi
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
});