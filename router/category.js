const { Router } = require("express");
const router = Router();
const { Category, Ingredient } = require("../database");
const { correct } = require("../helpers/correct");
//General category
router.post("/add-category", (req, res) => {
  req.body.title_category = correct(req.body.title_category);
  Category.add(req.body).then(item => {
    if (item.insertId > 0) {
      res.redirect("/category");
    } else {
      console.log("Category not saved");
      res.redirect("/category");
    }
  });
});
router.get("/category", (req, res) => {
  if (req.session.isAuth21) {
    Category.get().then(item => {
      Ingredient.get().then(ing => {
        res.render("category", {
          titlePage: "Category",
          category_list: item,
          ingredient_list: ing
        });
      });
    });
  } else {
    res.redirect("/login");
  }
});
router.delete("/remove-category", (req, res) => {
  Category.remove(req.query.id).then(item => {
    if (item.affectedRows) {
      res.json({
        status: 200
      });
    } else {
      res.json({
        status: 500
      });
    }
  });
});
router.post("/edit-category", (req, res) => {
  req.body.title_category = correct(req.body.title_category);
  Category.edit(req.body).then(item => {
    res.redirect("/category");
  });
});

// Ingredient category
router.post("/add-ingredient", (req, res) => {
  req.body.title_ingredient = correct(req.body.title_ingredient);
  Ingredient.add(req.body).then(item => {
    if (item.insertId > 0) {
      res.redirect("/category");
    } else {
      console.log("Category not saved");
      res.redirect("/category");
    }
  });
});
router.post("/edit-ingredient", (req, res) => {
  req.body.title_ingredient = correct(req.body.title_ingredient);
  Ingredient.edit(req.body).then(item => {
    res.redirect("/category");
  });
});
router.delete("/remove-ingredient", (req, res) => {
  Ingredient.remove(req.query.id).then(item => {
    if (item.affectedRows) {
      res.json({
        status: 200
      });
    } else {
      res.json({
        status: 500
      });
    }
  });
});

module.exports = router;
