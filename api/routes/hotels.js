import express from "express"
import { addHotel, updateHotel, deleteHotel, getHotel, getAllHotel } from "../controllers/hotel.js"; 

const router = express.Router();

// Route pour obtenir tous les hôtels
// router.get("/", getHotels);

// Route pour ajouter un hôtel
router.post("/", addHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getHotel);
router.get("/", getAllHotel);

export default router;