const router = require("express").Router();
const stats = require("../controllers/stats.controller");

router.get("/", stats.getStats);

router.get("/users", stats.getUserStats);
router.get("/formations", stats.getFormationStats);
router.get("/assignments", stats.getAssignmentStats);

module.exports = router;
