import express, { urlencoded } from "express";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

export default app;
