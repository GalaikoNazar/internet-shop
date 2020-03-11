const { Router } = require("express");
const router = Router();

router.get("/kitchen", (req, res) => {
  res.render("kitchen", {
    titlePage: "kitchen"
  });
});

module.exports = router;
