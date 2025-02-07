import express from "express";
import client from "./db.js";
import dotenv from 'dotenv';
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

dotenv.config();

// Fonction asynchrone pour établir la connexion et démarrer le serveur
const connect = async () => {
    try {
      // Attendre la connexion à PostgreSQL avant de démarrer le serveur
      await client.connect();
 
      console.log("Connecté à la base de données :", client.database);
  
      const app = express();

      app.use(express.json());
      app.use("/api/auth", authRoute);
      app.use("/api/users", usersRoute);
      app.use("/api/hotels", hotelsRoute);
      app.use("/api/rooms", roomsRoute);

      // middleware a utiliser pour la gestion des erreurs
      app.use((err,req,res,next) => {
        const errorStatus = err.status || 500
        const errorMessage = err.message || "Quelque chose a mal tourné"
        return res.status(errorStatus).json({
          success: false,
          status: errorStatus,
          message: errorMessage,
          stack: err.stack
        })
      })
  
      app.listen(8800, () => {
        console.log('Backend server est lancé!');
      });
  
    } catch (err) {
      console.error('Erreur de connexion à la base de données:', err);
    }
  }
  
  // Appel de la fonction pour démarrer la connexion et le serveur
  connect();