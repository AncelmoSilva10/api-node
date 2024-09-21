import { getConnection, releaseConnection } from '../connection.js';
import { BadRequestError } from '../errors/bad-request.error.js';

export const PostRepository = {
    postCreate: async (title, body) => {
        const sql = "INSERT INTO blog.tb_Post (title, body) VALUES (?,?)"
        const pool = await getConnection()
        await pool.query(sql, [title, body])
    },

    postRead: async (id) => {
        const sql = "SELECT * FROM blog.tb_Post WHERE idPost = ?"
        const pool = await getConnection()
        const [rows] = await pool.query(sql, [id])

        if (!rows) {
            throw new BadRequestError("Não foi possível encontrar o post com o ID informado.")
        }

        releaseConnection();

        return rows;
    },

    postUpdate: async (id, title, body) => {
        const sql =  "UPDATE blog.tb_Post SET title = ?, body = ? WHERE idPost = ?"
        const pool = await getConnection()
        const [rows] = await pool.query(sql, [title, body, id])

        if (!rows) {
            throw new BadRequestError("Não foi possível encontrar o post com o ID informado.")
        }

        releaseConnection();

        return rows;
    },

    postDelete: async (id) => {
        const sql = "DELETE FROM blog.tb_Post WHERE idPost = ?"
            const pool = await getConnection()
            const [rows] = await pool.query(sql, [id])
        
         if (!rows) {
            throw new BadRequestError("Não foi possível encontrar o post com o ID informado.")
         }
    
            releaseConnection();
    
            return rows;
    }
}