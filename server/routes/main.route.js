const { Router } = require("express"); //import express
const { checkCorrectNess } = require("../controllers/main.controller");

const router = Router();

router.post("/check-correctness", checkCorrectNess);

module.exports = router;
