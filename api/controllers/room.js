import client from "../db.js";
import { createError } from "../utils/error.js";

export const addRoom = async (req, res) => {
    const hotelId = req.params.hotelid;
    const { title, description, price, maxpeople, roomnumbers } = req.body;

    let roomNumbersJson;
    try {
        roomNumbersJson = JSON.stringify(roomnumbers);
    } catch (error) {
        return res.status(400).json({ error: "Invalid JSON format for roomnumbers" });
    }

    const query = `
        INSERT INTO rooms (title, description, price, maxpeople, roomnumbers, id) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *;
    `;

    const values = [title, description, price, maxpeople, roomNumbersJson, hotelId];

    client.query(query, values, (err, data) => {
        if (err) {
            console.log(err, 'erreur');
            return res.status(500).json({ error: "Erreur lors de l'ajout de la chambre" });
        }
        if (!data) {
            return res.status(500).json({ error: "Aucune donnée retournée" });
        }
        const savedRoom = data.rows[0];
        return res.status(200).json(savedRoom);
    });
};

export const updateRoom = (req, res) => {
    const updateRoom = req.body;
    const idRoom = req.params.roomid;

    let roomNumbersJson;
    try {
        roomNumbersJson = JSON.stringify(updateRoom.roomnumbers);
    } catch (error) {
        return res.status(400).json({ error: "Invalid JSON format for roomnumbers" });
    }

    const query = `
        UPDATE rooms
        SET title = $1, price = $2, maxpeople = $3, description = $4, roomnumbers = $5
        WHERE id = $6
        RETURNING *;
    `;
    const values = [
        updateRoom.title,
        updateRoom.price,
        updateRoom.maxpeople,
        updateRoom.description,
        roomNumbersJson,
        idRoom
    ];
    
    client.query(query, values, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data.rows[0]);
    });
};

export const deleteRoom = (req, res) => {
    const idRoom = req.params.roomid;
    const query = `
        DELETE FROM rooms
        WHERE id = $1
        RETURNING *;
    `;

    const values = [idRoom];
    
    client.query(query, values, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data.rows[0]);
    });
};

export const getRoom = (req, res) => {
    const idRoom = req.params.roomid;
    const query = `
        SELECT * FROM rooms
        WHERE id = $1;
    `;
    
    const values = [idRoom];
    
    client.query(query, values, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data.rows[0]);
    });
};

export const getAllRooms = (req, res) => {
    const query = `
        SELECT * FROM rooms;
    `;
    
    client.query(query, (err, data) => {
        if (err) {
            console.log(err, 'erreur');
        }
        return res.status(200).json(data.rows);
    });
};
