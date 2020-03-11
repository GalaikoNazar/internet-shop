// const sharp = require("sharp");
const fs = require("fs");
const sharp = require("sharp");
const { Offer } = require("../database");
var bg = require("gulp-util");

class Image {
  static addOffer(req, res, route) {
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("(up) Photo not uploaded");
      return res.redirect("/kitchen");
    }

    // get file image
    let sampleFile = req.files.image;
    let imgName = req.files.image.name.trim();
    let newName = `${Date.now()}-${imgName}`;
    let path = `public/offers/${newName}`;
    let thumbUrl = `public/offers/thumb/thumb-${newName}`;
    // for DB
    let thumbName = `/offers/thumb/thumb-${newName}`;
    let fullPhoto = `/offers/${newName}`;
    // \ for DB
    let width = 350;
    let height = 210;
    sampleFile.mv(path, function(err) {
      if (err) {
        console.log("-------", err);
        return res.redirect(`/kitchen`);
      } //
      else {
        sharp(path)
          .resize(width, height)
          .toFile(`${thumbUrl}`, (err, info) => {
            if (!err) {
              console.log("Image  changed");
              req.body.image = fullPhoto;
              req.body.thumb_image = thumbName;
              //if edit new offer
              if (route == "/edit-offer") {
                Image.removeIMG(`public${req.body.current_image}`);
                Image.removeIMG(`public${req.body.current_thumb_image}`);
                Offer.edit(req.body).then(item => {
                  res.redirect(`/offer-edit/${req.body.id}`);
                });
              }
              //if add new offer
              else {
                Offer.add(req.body).then(item => {
                  res.redirect(`/kitchen`);
                });
              }
            } //
            else {
              console.log("Image NOT changed");
              res.redirect(`/kitchen`);
            }
          });
      }
    });
  }
  static removeIMG(path) {
    return fs.unlink(path, err => {
      if (err) {
        console.log(err);
        console.log(bg.colors.red("Image not removed!"));
        return "image not removed";
      } else {
        console.log(bg.colors.green("Image removed!"));
        return "image removed";
      }
    });
  }
}

module.exports.Image = Image;
