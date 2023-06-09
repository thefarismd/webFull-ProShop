import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

//CONNECTION
dotenv.config();
connectDB();
const app = express();

app.use(express.json()); //accept JSON data in the body

//ROUTING
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

app.use(notFound);

app.use(errorHandler);

//DYNAMIC PORT CONNECTION
let port = process.env.PORT;

if (port == null || port == '') {
  port = 4000;
}

app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${port}`.cyan.underline
  )
);
