import express from 'express';
import connectDB from './src/utils/db.connector.js';
import authRoutes from './src/routes/auth.routes.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

// Middelware
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

// Error Handing Middelware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

// port number 
const port =  3000;

const start = async () =>{
    try {
        await connectDB(process.env.MONGO)
        app.listen(port, console.log(`Server is Listing to port : ${port} & DB Connected!`));
    } catch (error) {
        console.log(error);
    }
}

start()