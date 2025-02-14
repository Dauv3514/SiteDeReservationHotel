import express from "express";
import { addHotel, updateHotel, deleteHotel, getHotel, getAllHotel, countByCity, countByType, getHotelRooms } from "../controllers/hotel.js"; 
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Route pour ajouter un hôtel
router.post("/", verifyAdmin, addHotel);

// Route pour mettre à jour un hôtel
router.put("/:id", verifyAdmin, updateHotel);

// Route pour supprimer un hôtel par son ID
router.delete("/:id", verifyAdmin, deleteHotel);

// Route pour obtenir un hôtel par son ID
router.get("/find/:id", getHotel);

// Route pour obtenir tous les hôtels
router.get("/", getAllHotel);

// Route pour compter les hôtels par ville
router.get("/countByCity", countByCity);

// Route pour compter les hôtels par type
router.get("/countByType", countByType);

// Route pour obtenir les chambres d'un hôtel
router.get("/room/:id", getHotelRooms);

export default router;