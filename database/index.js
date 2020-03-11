const { connection } = require("../config");

connection.connect(function(err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  } else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

class Offer {
  static async add(el) {
    const {
      title,
      status,
      type_small,
      price_small,
      type_big,
      price_big,
      category,
      description,
      image,
      thumb_image,
      storage
    } = el;
    const sql = `INSERT INTO offers(title, status, type_small, price_small, type_big, price_big, category, description, image, thumb_image, storage) VALUES("${title}","${status}", "${type_small}","${price_small}", "${type_big}", "${price_big}", "${category}", "${description}", "${image}", "${thumb_image}", "${storage}")`;
    return await connection
      .query(sql)
      .then(result => {
        console.log("Data post, saved");
        return result[0];
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
  static async get(el) {
    const sql = `SELECT * FROM offers`;
    return await connection
      .query(sql)
      .then(result => {
        return result[0];
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
  static async getCurrent(id) {
    const sql = `SELECT * FROM offers WHERE id="${id}"`;
    return await connection
      .query(sql)
      .then(result => {
        return result[0];
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
  static async edit(el) {
    const {
      title,
      status,
      type_small,
      price_small,
      type_big,
      price_big,
      category,
      description,
      image,
      thumb_image,
      storage,
      id
    } = el;
    const sql = `UPDATE offers SET title= "${title}", status= "${status}", type_small= "${type_small}", price_small= "${price_small}", type_big= "${type_big}", price_big= "${price_big}", category= "${category}", description= "${description}", image= "${image}", thumb_image= "${thumb_image}", storage= "${storage}" WHERE id= "${id}"`;
    return await connection
      .query(sql)
      .then(result => {
        console.log("Data post, saved");
        return result[0];
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
  static async remove(id) {
    const sql = `DELETE FROM offers WHERE id="${id}"`;
    return await connection
      .query(sql)
      .then(result => {
        return result[0];
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}

module.exports.Offer = Offer;
