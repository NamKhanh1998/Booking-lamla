import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/usertest.js";

const router = express.Router();

// //UPDATE
// router.put("/:id", verifyUser, updateUser);
// //DELETE
// router.delete("/:id", verifyUser, deleteUser);
// //GET
// router.get("/:id", verifyUser, getUser);
// //GETALL
// router.get("/", verifyAdmin, getUsers);

router.post("/", createUser);
router.get("/", getUsers);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
