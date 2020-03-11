const { Router } = require("express");
const router = Router();

router.get("/cart", (req, res) => {
  res.render("cart", {
    titlePage: "cart"
  });
});

module.exports = router;
