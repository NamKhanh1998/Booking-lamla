import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/User.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkuser/:id", verifyUser, (req, res) => {
  res.send("Sucessss");
});

router.get("/checkadmin", verifyAdmin, (req, res) => {
  res.send("Sucessss admin");
});

//UPDATE
router.put("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GETALL
router.get("/", verifyAdmin, getUsers);

export default router;
