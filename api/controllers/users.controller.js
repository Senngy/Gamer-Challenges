import { User, Like, Challenge } from "../database/models/index.js";

export async function getAll(req, res) {
  const users = [
    { pseudo: "Jules95", email: "jules@example.com", password: "hashedpass1"},
    { pseudo: "LaraCroft", email: "lara@example.com", password: "hashedpass2"},
    { pseudo: "AlexDev", email: "alex@example.com", password: "hashedpass3"}
  ];
    if (!users || users.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "No users found" });
    }
  return res.json(users);
}

export async function getById(req, res) {
    const user = await User.findByPk(req.params.id, {
        attributes: ["id", "pseudo", "email", "avatar"],
    });
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    }
  return res.json(user);
}

/*
export async function getTopUsersByLikes(req, res) {
  const userId =  
 

}
  */