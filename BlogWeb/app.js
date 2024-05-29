import cookieParser from "cookie-parser";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

export default app;
