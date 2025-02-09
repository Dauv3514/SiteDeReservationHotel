import client from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const registerUser = (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
    };
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [
        newUser.username,
        newUser.email,
        newUser.password,
    ];

    client.query(query, values, (err, data) => {
        if (err) {
            console.log(err, 'no');
            return res.status(500).json(err);
        }
        return res.status(200).json({
            message: "Utilisateur créé",
            user: data.rows[0]
        });
    });
}

export const login = (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = $1';

    client.query(query, [username], (err, data) => {
        if (err) {
            console.log(err, "erreur du serveur");
            return res.status(500).json(err);
        }
        const user = data.rows[0];
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Mot de passe ou username incorrect" });
        }
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );
      
        const { password: _, isAdmin, ...otherDetails } = user; 
        res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin });
    });
};