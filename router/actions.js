const { Router } = require("express");
const router = Router();

router.get("/actions", (req, res) => {
  res.render("actions", {
    titlePage: "actions"
  });
});

module.exports = router;
