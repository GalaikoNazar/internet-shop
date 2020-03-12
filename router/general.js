const { Router } = require("express");
const router = Router();
const { Slide } = require("../database");

router.get("/general", (req, res) => {
  Slide.get().then(slide => {
    res.render("general", {
      titlePage: "General",
      slider_list: slide
    });
  });
});

module.exports = router;
