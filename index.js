
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import colors from "colors";
import dotenv from "dotenv";
import connectDB from './dbConnection.js';
// import employeeRoutes from './routes/employeeRoutes.js'
// import departmentRoutes from './routes/departmentRoutes.js'
import departmentRoutes from "./routes/departmentRoutes.js";

//configure env
dotenv.config()

//databse config
connectDB()

//rest object
const app = express()

//middelwares

app.use(morgan('dev'))
app.use(express.json())

app.use(cors({
    origin: ["http://localhost:3003", "https://hr.netlify.app"],
    credentials: true,
}))

// Router
// app.use('/api/v1/employee', employeeRoutes)
// app.use('/api/v1/department', departmentRoutes)
app.use('/api/v1/department',departmentRoutes )

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white
    );
});
