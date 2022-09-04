import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import router from "./routes/router.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);
server.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})