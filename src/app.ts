import express from "express";
import authRoute from "./interface/routes/auth-route"

const app = express();

app.use(express.json());


app.use("/api/auth",authRoute)

export default app;
