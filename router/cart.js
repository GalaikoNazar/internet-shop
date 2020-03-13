const { Router } = require("express");
const router = Router();
const { Offer } = require("../database");

router.get("/cart", (req, res) => {
  res.render("Cart", {
    titlePage: "Cart"
  });
  // const { id, size, price, length } = req.query;
  //create string request to database
  // let string = "";
  // for (let i = 0; i < id.length; i++) {
  //   if (id.length > 1) {
  //     if (i < +id.length - 1) {
  //       string += `id="${id[i]}" OR `;
  //     } else {
  //       string += `id="${id[i]}"`;
  //     }
  //   }
  // }
  // Offer.getMany(string).then(item => {
  //   for (let i = 0; i < item.length; i++) {
  //     item[i].length = length[i];
  //     item[i].type_offer = size[i];
  //     item[i].price = price[i];
  //     delete item[i].description;
  //     delete item[i].storage;
  //     delete item[i].type_small;
  //     delete item[i].price_small;
  //     delete item[i].status;
  //     delete item[i].main_ingredient;
  //     delete item[i].image;
  //     delete item[i].type_big;
  //     delete item[i].price_big;
  //     delete item[i].category;
  //   }
  // });
});

router.post("/cart", (req, res) => {
  try {
    let data = JSON.parse(req.body.order);
    console.log(data);
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
        delete item[i].category;
      }
      // console.log("-------------", item, "----------------");
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
