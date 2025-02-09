import express from "express"
import { addRoom, updateRoom, deleteRoom, getRoom, getAllRooms } from "../controllers/room.js"; 
import { verifyAdmin  } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:hotelid", verifyAdmin, addRoom);
router.put("/:roomid", verifyAdmin, updateRoom);
router.delete("/:roomid", verifyAdmin, deleteRoom);
router.get("/:roomid", getRoom);
router.get("/", getAllRooms);

export default router;