import client from "../db.js"; 

export const addUser = (req, res) => {
    const newUser = req.body;
    const query = 'INSERT INTO users (name, city, address, distance, photos, title, description, rating, rooms, cheapestPrice, featured) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
    const values = [
        newUser.name,
        newUser.city,
        newUser.address,
        newUser.distance,
        newUser.photos,
        newUser.title,
        newUser.description,
        newUser.rating,
        newUser.rooms,
        newUser.cheapestPrice,
        newUser.featured
    ];
    
    client.query(query, values, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data.rows[0]);
    });
};

export const updateUser = (req, res) => {
    const updateUser = req.body;
    const idUser = req.params.id;
    const query = `
        UPDATE users
        SET name = $1, city = $2, address = $3, distance = $4, photos = $5, title = $6, description = $7, rating = $8, rooms = $9, cheapestPrice = $10, featured = $11
        WHERE id = $12
        RETURNING *;
    `;
    const values = [
        updateUser.name,
        updateUser.city,
        updateUser.address,
        updateUser.distance,
        updateUser.photos,
        updateUser.title,
        updateUser.description,
        updateUser.rating,
        updateUser.rooms,
        updateUser.cheapestPrice,
        updateUser.featured,
        idUser
    ];
    
    client.query(query, values, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data.rows[0]);
    });
};

export const deleteUser = (req, res) => {
    const idUser = req.params.id;
    const query = `
        DELETE FROM users
        WHERE id = $1
        RETURNING *;
    `;

    const values = [idUser];
    
    client.query(query, values, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data.rows[0]);
    });
};

export const getUser = (req, res) => {
    const idUser = req.params.id;
    const query = `
        SELECT * FROM users
        WHERE id = $1;
    `;
    
    const values = [idUser];
    
    client.query(query, values, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data.rows[0]);
    });
};

export const getAllUsers = (req, res) => {

    const query = `
        SELECT * FROM users
    `;
    
    client.query(query, (err, data) => {
        if (err) {
            console.log(err, 'erreur');
        }
        return res.status(200).json(data.rows);
    });
};