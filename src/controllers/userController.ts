import { userDataMapper } from "../datamappers/userDatamapper";
import type { Request, Response } from "express";

const userController = {

    async index(_req: Request, res: Response) {
            try {
                const users = await userDataMapper.findAllUsers();
                res.json(users);
            } catch (error) {
                res.status(500).json({ error: "Failed to fetch users." });
            }
        },
        
    async show(req: Request, res: Response) {
        const id = Number(req.params.id);
            if (!id) {
                return res.status(400).json({ error: "Invalid user ID" });
            }
        },
    
        
    };

export default userController;