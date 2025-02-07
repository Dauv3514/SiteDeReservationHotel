import client from "../db.js";
import bcrypt from "bcryptjs"

export const registerUser = (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("B4c0/\/", salt);
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
};

export const login = (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = $1';

    client.query(query, [username], (err, data) => {
        if (data.rows.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        if (err) {
            console.log(err, "erreur du serveur");
            return res.status(500).json(err);
        }
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }
        return res.status(200).json({
            message: "Utilisateur créé",
            user: data.rows[0]
        });
    });
};