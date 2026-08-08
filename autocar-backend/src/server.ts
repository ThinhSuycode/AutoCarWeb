import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { carRouter } from "./routes/car.routes";
import { userRouter } from "./routes/users.routes";
import { carDetailRouter } from "./routes/carDetail.routes";
import { articleRouter } from "./routes/articles.routes";
import { articleDetailRouter } from "./routes/articleDetails.routes";
import authRouter from "./routes/auth.routes";
import { contactRouter } from "./routes/contact.routes";
import uploadRouter from "./routes/upload.route";
import dashboardRouter from "./routes/dashboard.route";
import { appointmentRouter } from "./routes/appointment.routes";
import orderRouter from "./routes/order.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5175", "http://localhost:5173"],
  }),
);

app.use(express.json());

app.use("/api", carRouter);
app.use("/api", userRouter);
app.use("/api", carDetailRouter);
app.use("/api", articleRouter);
app.use("/api", articleDetailRouter);
app.use("/api/auth", authRouter);
app.use("/api", contactRouter);
app.use("/api/upload", uploadRouter);
app.use("/api", appointmentRouter);
app.use("/api", orderRouter);
app.use("/api", dashboardRouter);
const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
