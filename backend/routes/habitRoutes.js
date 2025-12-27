const router = require("express").Router();
const { addHabit, getHabits } = require("../controllers/habitController");

router.post("/", addHabit);
router.get("/", getHabits);

module.exports = router;
