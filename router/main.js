const { Router } = require("express");
const router = Router();
const { Offer, Slide } = require("../database");

router.get("/", (req, res) => {
  let obj = {};
  obj.slider_dots = [];
  Slide.get().then(slide => {
    obj.slider_list = slide;
    obj.drinks = [];
    Offer.get().then(item => {
      item.filter(off => {
        if (off.category == "Sauces") {
          off.public = false;
        } 
        else if(off.category == "Drinks"){
          obj.drinks.push(off)
        }
        else {
          off.public = true;
        }
      });
      obj.offers = item;
      console.log(obj)
      obj.titlePage = "Main";
      res.render("main", obj);
    });
  });
});

module.exports = router;
