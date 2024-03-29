const {
	getUser,
	RegisterUser,
	updatingLogic,
	updatingLeadership,
	updatingPsycho,
	LoginUser,
} = require("../Contoller/UserController");
const express = require("express");
const upload = require("../Utils/multer");

const router = express.Router();

router.get("/users", getUser);

router.post("/register", upload, RegisterUser);
router.post("/login", LoginUser);
router.patch("/editLogic/:id", updatingLogic);
router.patch("/editLeadership/:id", updatingLeadership);
router.patch("/editPsycho/:id", updatingPsycho);

module.exports = router;
