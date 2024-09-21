import { BadRequestError } from "../errors/bad-request.error.js"
import { PostRepository } from "../repositories/post.repository.js"


export const PostController = {
    postCreate: async (request, response) => {
        try {
            const { title, body } = request.body
            if (!title || !body) {
                return response.status(400).json({ error: "Ta faltando coisa ai retardado!" })
            }
            await PostRepository.postCreate(title, body);
            return response.status(200).json({ message: "Post criado com sucesso!" })
        } catch (error) {
            console.log(error)
            return response.status(500).json({ error })
        }
    },

    postRead: async (request, response) => {
        const {id} = request.params
    try{
        const rows = await PostRepository.postRead(id)
        return response.status(200).json(rows[0])
    }catch (error) {
        console.log(error)
        if(error instanceof BadRequestError){
            return response.status(400).json({error: error.message})
        }
        return response.status(500).json({ error })
    }
    },

    postUpdate: async (request, response) => {
    try{
        const { title, body } = request.body
        const { id } = request.params
        if (!title || !body) {
            return response.status(400).json({ error: "Ta faltando coisa ai retardado!" })
        }
        
        await PostRepository.postUpdate(id, title, body);

    }catch (error) {
        console.log(error)
        if(error instanceof BadRequestError){
            return response.status(400).json({error: error.message})
        }
        return response.status(500).json({ error })
    }
    },

    postDelete: async (request, response) => {
        const {id} = request.params
        try{
            await PostRepository.postDelete(id);
            return response.status(200).json({message: "Post apagado com sucesso!"})

        }catch (error) {
            console.log(error)
            if(error instanceof BadRequestError){
                return response.status(400).json({error: error.message})
            }
            return response.status(500).json({ error })
        }
    },

}