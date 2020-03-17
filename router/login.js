const { Router } = require("express");
const router = Router();
const { hashPass } = require("../helpers/hash");
const { User } = require("../database");

router.get("/login", (req, res) => {
  if (!req.session.isAuth21) {
    req.session.isAuth21 = false;
    res.render("login", {
      titlePage: "Login",
      errMess: req.session.errMess0
    });
  } else {
    res.render("login", {
      titlePage: "Login",
      errMess: req.session.errMess0
    });
  }
});

router.post("/login", (req, res) => {
  let pass = hashPass(req.body.pass);
  req.body.pass = pass;

  User.auth(req.body).then(item => {
    if (item.length == 0) {
      req.session.errMess0 = "User not exist";
      res.redirect("/login");
    } else {
      if (pass != req.body.pass) {
        req.session.errMess0 = "Wrong password";
        res.redirect("/login");
      } else {
        req.session.isAuth21 = true;
        res.redirect("/general");
      }
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.isAuth21 = false;
  req.session.errMess0 = "";
  res.redirect("/login");
});

module.exports = router;
