import e from "express";
import { getConnection } from "./connection.js";
import { configDotenv } from "dotenv";

configDotenv();

const app = e();
app.use(e.json());
app.use(e.urlencoded({ extended: false }));

app.post("/post/create", async (request, response) => {
    try {
        const { title, body } = request.body
        if (!title || !body) {
            return response.status(400).json({ error: "Ta faltando coisa ai retardado!" })
        }
        const sql = "INSERT INTO blog.tb_Post (title, body) VALUES (?,?)"
        const pool = await getConnection()
        await pool.query(sql, [title, body])
        return response.status(200).json({ message: "Post criado com sucesso!" })
    } catch (error) {
        console.log(error)
        return response.status(500).json({ error })
    }
})

app.get("/post/:id", (request, response) => {
    const { id } = request.params
    return response.status(200).json({ id })
})


app.listen(8080, () => {
    console.log("servidor rodando na porta 8080")
});

