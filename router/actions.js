const { Router } = require("express");
const router = Router();
const { Actions } = require("../database");
const { Image } = require("../helpers");

// pablic
router.get("/actions", (req, res) => {
  Actions.get().then(item => {
    res.render("actions", {
      titlePage: "Actions",
      actions_list: item
    });
  });
});
router.get("/single-actions/:id", (req, res) => {
  Actions.getCurrent(req.params.id).then(item => {
    console.log(item[0]);
    res.render("single_action", {
      titlePage: item[0].title,
      actions_list: item[0]
    });
  });
});

// privat
router.get("/actions-panel", (req, res) => {
  if (req.session.isAuth21) {
    Actions.get().then(item => {
      res.render("actions-panel", {
        titlePage: "Actions-panel",
        actions_list: item
      });
    });
  } else {
    res.redirect("/login");
  }
});

router.post("/add-actions", (req, res) => {
  Image.actions(req, res, null);
});
//view current page
router.get("/actions-edit/:id", (req, res) => {
  if (req.session.isAuth21) {
    Actions.getCurrent(req.params.id).then(item => {
      console.log(item);
      res.render("actions-edit", {
        titlePage: "Edit action",
        actions: item[0]
      });
    });
  } else {
    res.redirect("/login");
  }
});
// edit current page
router.post("/actions-edit/:id", (req, res) => {
  if (req.files) {
    Image.actions(req, res, "/actions-edit");
  } else {
    req.body.image = req.body.current_image;
    req.body.thumb_image = req.body.current_thumb_image;
    Actions.edit(req.body).then(item => {
      res.redirect(`/actions-edit/${req.params.id}`);
    });
  }
});
router.delete("/actions-remove", (req, res) => {
  if (req.query.id) {
    Actions.remove(req.query.id).then(item => {
      Image.removeIMG(`public${req.query.image}`);
      Image.removeIMG(`public${req.query.thumb_image}`);
      console.log("Action removed");
      res.json({
        status: 200
      });
    });
  } else {
    console.log("Action dont removed");
    res.json({
      status: 500
    });
  }
});

module.exports = router;
