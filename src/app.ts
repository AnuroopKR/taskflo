import express from "express";
import authRoute from "./interface/routes/auth-route"
import companyRoute from './interface/routes/company-route'
const app = express();

app.use(express.json());


app.use("/api/auth",authRoute)
app.use("/api/company",companyRoute)


export default app;
