import next from "next";
import express, { Request, Response, NextFunction } from "express";

import orderRoutes from "./routes/order";
import authRoutes from "./routes/auth";
import customerRoutes from "./routes/customer";
import productRoutes from "./routes/product";

const port = parseInt(process.env.PORT!, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.use("/api/auth", authRoutes);
  server.use("/api/products", productRoutes);
  server.use("/api/customers", customerRoutes);
  server.use("/api/orders", orderRoutes);

  server.get("/*", (req, res) => {
    return handle(req, res);
  });

  server.use(
    (error: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = error.statusCode || 500;
      const message = error.message;
      const data = error.data;

      res.status(status).json({ message: message, data: data });
    }
  );

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

// server.get('/a', (req, res) => {
//   return app.render(req, res, '/a', req.query)
// })
// server.get('/post/:title', function (req, res) {
//   return app.render(req, res, '/post', { title: req.params.title})
// })
// RequestHandler<{ id: string }> pa const todoId = req.params.id
