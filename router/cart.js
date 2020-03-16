const { Router } = require("express");
const router = Router();
const { Offer } = require("../database");

router.get("/cart", (req, res) => {
  Offer.getMany('category="Drinks"').then(el => {
    el.forEach(item => {
      // delete item.image;
      delete item.status;
      delete item.storage;
      delete item.type_big;
      delete item.price_big;
      delete item.type_small;
      delete item.description;
      delete item.main_ingredient;
    });
    res.render("Cart", {
      titlePage: "Cart",
      drinks: el
    });
  });
});

router.post("/cart", (req, res) => {
  try {
    let data = JSON.parse(req.body.order);
    const { id, size, price, length } = data;
    //create string request to database
    let string = "";
    for (let i = 0; i < data.length; i++) {
      if (i < +data.length - 1) {
        string += `id="${data[i].id}" OR `;
      } else {
        string += `id="${data[i].id}"`;
      }
    }
    //request to database
    Offer.getMany(string).then(item => {
      for (let i = 0; i < item.length; i++) {
        item[i].length = data[i].length;
        item[i].type_offer = data[i].size;
        item[i].price = data[i].price;
        delete item[i].description;
        delete item[i].storage;
        delete item[i].type_small;
        delete item[i].price_small;
        delete item[i].status;
        delete item[i].main_ingredient;
        delete item[i].image;
        delete item[i].type_big;
        delete item[i].price_big;
      }
      res.json({
        orders: item
      });
    });
  } catch (err) {
    console.log(err);
    res.render("cart", {
      titlePage: "cart"
    });
  }
});

module.exports = router;
