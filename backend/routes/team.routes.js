import { Router } from "express";
import { getAllMembers, searchMembers, inviteMember } from "../controllers/team.controller.js";
import { verifyJWT } from "../utils/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllMembers);
router.route("/invite").post(inviteMember);
router.route("/search").get(searchMembers);

export default router;
