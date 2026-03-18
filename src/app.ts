import express from "express";
import authRoute from "./interface/routes/auth-route"
import companyRoute from './interface/routes/company-route'
import userRoute from './interface/routes/userRoute'
import taskRoute from './interface/routes/task-route'
const app = express();

app.use(express.json());


app.use("/api/auth",authRoute)
app.use("/api/company",companyRoute)
app.use("/api/user",userRoute)
app.use("/api/task",taskRoute)

export default app;
