import e from "express";
import { configDotenv } from "dotenv";
import postRouter from "./routes/post.routes.js";

configDotenv();

const app = e();
app.use(e.json());
app.use(e.urlencoded({ extended: false }));

app.use(postRouter);

app.listen(8080, () => {
    console.log("servidor rodando na porta 8080")
});

