const { Router } = require("express");
const router = Router();

router.get("/contact", (req, res) => {
  res.render("contact", {
    titlePage: "contact"
  });
});

module.exports = router;
