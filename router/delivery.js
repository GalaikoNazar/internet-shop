const { Router } = require("express");
const router = Router();

router.get("/delivery", (req, res) => {
  res.render("delivery", {
    titlePage: "Delivery"
  });
});

module.exports = router;
