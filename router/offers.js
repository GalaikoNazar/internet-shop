const { Router } = require("express");
const router = Router();
const { Offer } = require("../database");
const { Image } = require("../helpers");

router.get("/all-offers", (req, res) => {
  let obj = {};
  Offer.get().then(item => {
    obj.offers = item;
    obj.titlePage = "All offers";
    res.render("allOffers", obj);
  });
});

router.get("/single/:id", (req, res) => {
  let obj = {};
  Offer.getCurrent(req.params.id).then(item => {
    obj.offer = item[0];
    obj.titlePage = "single";
    // obj.zlupka = crypto.createHmac('sha256', 'nazargalaiko@gmail.com:Nazar ne faka:0.50:UAH:').update(password).digest('hex');
    res.render("single-offer", obj);
  });
});

//----------------------CRUD
router.get("/add-offer", (req, res) => {
  res.redirect("/kitchen");
});
// add offer
router.post("/add-offer", (req, res) => {
  if (req.files) {
    Image.addOffer(req, res, null);
  } else {
    res.redirect("/add-offer");
  }
});

router.post("/edit-offer", (req, res) => {
  if (req.files) {
    Image.addOffer(req, res, "/edit-offer");
  } else {
    req.body.image = req.body.current_image;
    req.body.thumb_image = req.body.current_thumb_image;
    Offer.edit(req.body).then(item => {
      res.redirect(`/offer-edit/${req.body.id}`);
    });
  }
});
// if offer dont have --id--
router.get("/offer-edit", (req, res) => {
  res.redirect("/all-offers");
});

router.get("/offer-edit/:id", (req, res) => {
  let obj = {};
  if (req.params.id) {
    Offer.getCurrent(req.params.id).then(item => {
      obj.offer = item[0];
      obj.titlePage = "Edit offer";
      // obj.zlupka = crypto.createHmac('sha256', 'nazargalaiko@gmail.com:Nazar ne faka:0.50:UAH:').update(password).digest('hex');
      console.log(obj)
      res.render("editOffer", obj);
    });
  } else {
    res.redirect("/all-offers");
  }
});

router.delete("/offer-remove", (req, res) => {
  Offer.remove(req.query.id).then(item => {
    if (item.affectedRows) {
      res.json({ status: 200 });
      Image.removeIMG(`public${req.query.image}`);
      Image.removeIMG(`public${req.query.thumb}`);
    } else {
      res.json({ status: 500 });
    }
  });
});

module.exports = router;
