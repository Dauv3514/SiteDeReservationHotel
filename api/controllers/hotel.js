import client from "../db.js"; 

export const addHotel = (req, res) => {
    const newHotel = req.body;
    const query = 'INSERT INTO hotels (name, city, address, distance, photos, title, description, rating, rooms, cheapestPrice, featured) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
    const values = [
        newHotel.name,
        newHotel.city,
        newHotel.address,
        newHotel.distance,
        newHotel.photos,
        newHotel.title,
        newHotel.description,
        newHotel.rating,
        newHotel.rooms,
        newHotel.cheapestPrice,
        newHotel.featured
    ];
    
    client.query(query, values, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data.rows[0]);
    });
};

export const updateHotel = (req, res) => {
    const updateHotel = req.body;
    const idUser = req.params.id;
    const query = `
        UPDATE hotels
        SET name = $1, city = $2, address = $3, distance = $4, photos = $5, title = $6, description = $7, rating = $8, rooms = $9, cheapestPrice = $10, featured = $11
        WHERE id = $12
        RETURNING *;
    `;
    const values = [
        updateHotel.name,
        updateHotel.city,
        updateHotel.address,
        updateHotel.distance,
        updateHotel.photos,
        updateHotel.title,
        updateHotel.description,
        updateHotel.rating,
        updateHotel.rooms,
        updateHotel.cheapestPrice,
        updateHotel.featured,
        idUser
    ];
    
    client.query(query, values, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data.rows[0]);
    });
};

export const deleteHotel = (req, res) => {
    const idUser = req.params.id;
    const query = `
        DELETE FROM hotels
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

export const getHotel = (req, res) => {
    const idUser = req.params.id;
    const query = `
        SELECT * FROM hotels
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

export const getAllHotel = (req, res) => {

    const query = `
        SELECT * FROM hotels
    `;
    
    client.query(query, (err, data) => {
        if (err) {
            next(err)
        }
        return res.status(200).json(data.rows);
    });
};