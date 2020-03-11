const { Router } = require("express");
const router = Router();

router.get("/delivery", (req, res) => {
  res.render("delivery", {
    titlePage: "delivery"
  });
});

module.exports = router;
