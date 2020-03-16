const { Router } = require("express");
const router = Router();
const { Slide } = require("../database");

router.get("/general", (req, res) => {
  console.log(req.session)
  if (req.session.isAuth21) {
    Slide.get().then(slide => {
      res.render("general", {
        titlePage: "General",
        slider_list: slide
      });
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
