import {Router} from "express";
import { PostController } from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.post("/post/create", (req, res) => PostController.postCreate(req, res));
postRouter.get("/post/:id", (req, res) => PostController.postRead(req, res));
postRouter.put("/post/update/:id", (req, res) => PostController.postUpdate(req, res));
postRouter.delete("/post/delete/:id", (req, res) => PostController.postDelete(req, res));

export default postRouter;