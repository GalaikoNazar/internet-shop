const { Router } = require("express");
const router = Router();

router.get("/single-action/1", (req, res) => {
  res.render("single_action", {
    titlePage: "single_action"
  });
});

module.exports = router;
