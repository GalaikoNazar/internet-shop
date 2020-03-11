const { Router } = require("express");
const router = Router();
const { Offer } = require("../database");

router.get("/", (req, res) => {
  let obj = {};
  Offer.get().then(item => {
    obj.offers = item;
    obj.titlePage = "main";
    res.render("main", obj);
  });
});

module.exports = router;
