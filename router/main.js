const { Router } = require("express");
const router = Router();
const { Offer, Slide } = require("../database");

router.get("/", (req, res) => {
  let obj = {};
  obj.slider_dots = [];
  Slide.get().then(slide => {
    obj.slider_list = slide;
    Offer.get().then(item => {
      obj.offers = item;
      obj.titlePage = "Main";
      res.render("main", obj);
    });
  });
});

module.exports = router;
