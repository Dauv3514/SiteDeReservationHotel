import express from "express";
import { addHotel, updateHotel, deleteHotel, getHotel, getAllHotel, countByCity, countByType } from "../controllers/hotel.js"; 
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Route pour compter les hôtels par ville
router.get("/countByCity", countByCity);

// Route pour compter les hôtels par type
router.get("/countByType", countByType);

// Route pour obtenir tous les hôtels
router.get("/", getAllHotel);

// Route pour obtenir un hôtel par son ID
router.get("/:id", getHotel);

// Route pour ajouter un hôtel
router.post("/", verifyAdmin, addHotel);

// Route pour mettre à jour un hôtel
router.put("/:id", verifyAdmin, updateHotel);

// Route pour supprimer un hôtel par son ID
router.delete("/:id", verifyAdmin, deleteHotel);

export default router;