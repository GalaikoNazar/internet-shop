const { Router } = require("express");
const router = Router();
const { Slide } = require("../database");
const { Image } = require("../helpers");

router.post("/add-slide", (req, res) => {
  Image.slide(req, res, null);
});
//view current page
router.get("/slide-edit/:id", (req, res) => {
  Slide.getCurrent(req.params.id).then(item => {
    res.render("slide-edit", {
      titlePage: "Edit slide",
      slide: item[0]
    });
  });
});
// edit current page
router.post("/slide-edit/:id", (req, res) => {
  if (req.files) {
    Image.slide(req, res, "/slide-edit");
  } else {
    req.body.image = req.body.current_image;
    req.body.thumb_image = req.body.current_thumb_image;
    Slide.edit(req.body).then(item => {
      res.redirect(`/slide-edit/${req.params.id}`);
    });
  }
});
router.delete("/remove-slide", (req, res) => {
  console.log(req.query);
  if (req.query.id) {
    Slide.remove(req.query.id).then(item => {
      Image.removeIMG(`public${req.query.image}`);
      Image.removeIMG(`public${req.query.thumb_image}`);
      res.json({
        status: 200
      });
    });
  } else {
    console.log("Slide dont removed");
    res.json({
      status: 500
    });
  }
});
module.exports = router;
