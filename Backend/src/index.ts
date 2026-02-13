import express, { type Request, type Response } from "express"
import cors from "cors"
import v1Router from "./routes/route.js";
import { PORT } from "./config/server.config.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
app.use(cookieParser());

app.get("/ping", (req , res) => {
    res.send("pong! server is working .")
});


app.use("/api/v1", v1Router);

app.get("/",( req: Request, res: Response) => {
   return res.send("Backend is hosted here and working")
})

app.use((req : Request, res : Response) => {
  res.status(404).json({ message: "Route not found" });
});


app.listen(PORT, () => {
    console.log("listigin here");
});