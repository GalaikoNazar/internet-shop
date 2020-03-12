// const sharp = require("sharp");
const fs = require("fs");
const sharp = require("sharp");
const { Offer, Slide } = require("../database");
var bg = require("gulp-util");

class Image {
  static addOffer(req, res, route) {
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("(up) Photo not uploaded");
      return res.redirect("/general");
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
        return res.redirect(`/add-offer`);
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
                  res.redirect(`/add-offer`);
                });
              }
            } //
            else {
              console.log("Image NOT changed");
              res.redirect(`/general`);
            }
          });
      }
    });
  }
  static slide(req, res, route) {
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("(up) Photo not uploaded");
      return res.redirect("/general");
    }
    let sampleFile = req.files.image;
    let imgName = req.files.image.name.trim();
    let newName = `${Date.now()}-${imgName}`;
    let path = `public/banner/${newName}`;
    let thumbUrl = `public/banner/thumb/thumb-${newName}`;
    // for DB
    let thumbName = `/banner/thumb/thumb-${newName}`;
    let fullPhoto = `/banner/${newName}`;
    // \ for DB
    let width = 252;
    let height = 201;
    sampleFile.mv(path, function(err) {
      if (err) {
        console.log("-------", err);
        return res.redirect(`/add-offer`);
      } //
      else {
        sharp(path)
          .resize(width, height)
          .toFile(`${thumbUrl}`, (err, info) => {
            if (!err) {
              console.log("Image  changed");
              req.body.image = fullPhoto;
              req.body.thumb_image = thumbName;

              //if edit new slide
              if (route == "/slide-edit") {
                  Image.removeIMG(`public${req.body.current_image}`);
                  Image.removeIMG(`public${req.body.current_thumb_image}`);
                  Slide.edit(req.body).then(item => {
                    res.redirect(`/slide-edit/${req.body.id}`);
                  });
              }
              //if add new slide
              else {
                Slide.add(req.body).then(item => {
                  console.log(item);
                  res.redirect("/general");
                });
              }
            } //
            else {
              console.log("Image NOT changed");
              res.redirect(`/general`);
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
