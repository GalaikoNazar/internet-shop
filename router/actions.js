const { Router } = require("express");
const router = Router();

router.get("/actions", (req, res) => {
  res.render("actions", {
    titlePage: "Actions"
  });
});

module.exports = router;
