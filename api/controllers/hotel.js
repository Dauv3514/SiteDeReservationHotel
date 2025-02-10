import client from "../db.js"; 

export const addHotel = (req, res) => {
    const newHotel = req.body;
    const query = 'INSERT INTO hotels (name, city, address, distance, photos, title, description, rating, rooms, cheapestPrice, featured, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
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
        newHotel.featured,
        newHotel.type
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
        SET name = $1, city = $2, address = $3, distance = $4, photos = $5, title = $6, description = $7, rating = $8, rooms = $9, cheapestPrice = $10, featured = $11, type = $12
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
        updateHotel.type,
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

    const { min = 1, max = 999, limit, ...others } = req.query;

    let query = `SELECT * FROM hotels WHERE cheapestprice > $1 AND cheapestprice < $2`;
    const values = [min, max];

    // Ajouter les autres filtres dynamiquement
    let index = 3; // Car $1 et $2 sont déjà utilisés pour min et max
    for (let key in others) {
        query += ` AND ${key} = $${index}`;
        values.push(others[key]);
        index++;
    }

    // Ajout de la limite si spécifiée
    if (limit) {
        query += ` LIMIT $${index}`;
        values.push(limit);
    }

    client.query(query, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des hôtels :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.status(200).json(result.rows);
    });
};

export const countByCity = async (req, res) => {
    try {
        if (!req.query.cities) {
            return res.status(400).json({ error: "Cities parametre est requis" });
        }

        const cities = req.query.cities.split(",");

        const query = `
            SELECT city, COUNT(*) AS count
            FROM hotels
            WHERE city = ANY($1::text[])
            GROUP BY city;
        `;

        const { rows } = await client.query(query, [cities]);

        res.status(200).json(rows);
    } catch (err) {
        console.error("❌ Erreur dans countByCity:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};

export const countByType = async (req, res, next) => {
    try {
      const query = `
        SELECT
          COUNT(CASE WHEN type = 'Hotel' THEN 1 END) AS hotelCount,
          COUNT(CASE WHEN type = 'Appartemment' THEN 1 END) AS appartemmentCount,
          COUNT(CASE WHEN type = 'Complexe touristique ' THEN 1 END) AS complexetouristiqueCount,
          COUNT(CASE WHEN type = 'Villa' THEN 1 END) AS villaCount,
          COUNT(CASE WHEN type = 'Chalet' THEN 1 END) AS chaletCount
        FROM
          hotels;
      `;
  
      const { rows } = await client.query(query);
  
      res.status(200).json([
        { type: "Hotel", count: rows[0].hotelcount },
        { type: "Appartemment", count: rows[0].appartemmentcount },
        { type: "Complexe touristique", count: rows[0].complexetouristiquecount },
        { type: "Villa", count: rows[0].villacount },
        { type: "Chalet", count: rows[0].chaletcount },
      ]);
    } catch (err) {
      next(err);
    }
  };
  