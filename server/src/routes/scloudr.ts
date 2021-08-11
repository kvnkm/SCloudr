import express from "express";
import SCloudr from "../controllers/scloudr";

const router = express.Router();
router.get("/likesByArtist", SCloudr.getLikesByArtist);

export = router;
