import userDataMapper from "../datamappers/userDatamapper.js";
const userController = {
    async index(_req, res) {
        const users = await userDataMapper.findAllUsers();
        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }
        return res.json(users);
    },
    async show(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const user = await userDataMapper.findUserById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(user);
    },
    async update(req, res) {
        const id = Number(req.params.id);
        const { first_name, last_name, email, password } = req.body;
        if (!id) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        if (!first_name || !last_name) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const updatedUser = await userDataMapper.updateUser({
            id,
            first_name,
            last_name,
            email,
            password,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(updatedUser);
    },
    async delete(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const user = await userDataMapper.findUserById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await userDataMapper.deleteUser(id);
        return res.status(204).send();
    },
};
export default userController;
