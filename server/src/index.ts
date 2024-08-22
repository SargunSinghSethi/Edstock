import express from "express";
import dontenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// ROUTE IMPORTS
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";

// CONFIGURATIONS

dontenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */

app.use("/dashboard",dashboardRoutes);
app.use("/dashboard",productRoutes);

/* Server */
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Serverd running at port ${port}`);
})