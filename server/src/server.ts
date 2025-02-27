const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000', 
credentials: true,
 methods: ['GET', 'POST', 'PUT', 'DELETE'], }));

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.post("/test", (_req,res)=> res.status(200).json("test Route"))
app.use(routes);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
