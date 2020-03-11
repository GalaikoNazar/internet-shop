const { Router } = require("express");
const router = Router();
const { Category } = require("../database");
router.get("/category", (req, res) => {
  Category.get().then(item => {
    res.render("category", {
      titlePage: "Category",
      category_list: item
    });
  });
});
router.post("/add-category", (req, res) => {
  console.log(req.body);
  Category.add(req.body).then(item => {
    if (item.insertId > 0) {
      res.redirect("/category");
    } else {
      console.log("Category not saved");
      res.redirect("/category");
    }
  });
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
  Category.edit(req.body).then(item => {
    res.redirect("/category");
  });
});

module.exports = router;
