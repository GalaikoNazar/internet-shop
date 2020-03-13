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
      category,
      title,
      status,
      type_small,
      price_small,
      type_big,
      price_big,
      main_ingredient,
      description,
      image,
      thumb_image,
      storage
    } = el;
    const sql = `INSERT INTO offers(category, title, status, type_small, price_small, type_big, price_big, main_ingredient, description, image, thumb_image, storage) VALUES("${category}","${title}","${status}", "${type_small}","${price_small}", "${type_big}", "${price_big}", "${main_ingredient}", "${description}", "${image}", "${thumb_image}", "${storage}")`;
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
  static async getMany(string) {
    const sql = `SELECT * FROM offers WHERE ${string} ORDER BY id`;
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

class Category {
  static async add(el) {
    const sql = `INSERT INTO category(title_category) VALUES("${el.title_category}")`;
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
  static async get() {
    const sql = `SELECT * FROM category`;
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
  static async remove(id) {
    const sql = `DELETE FROM category WHERE id="${id}"`;
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
    const sql = `UPDATE category SET title_category="${el.title_category}" WHERE id="${el.id}"`;
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

class Ingredient {
  static async add(el) {
    const sql = `INSERT INTO ingredient(title_ingredient) VALUES("${el.title_ingredient}")`;
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
  static async get() {
    const sql = `SELECT * FROM ingredient`;
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
  static async remove(id) {
    const sql = `DELETE FROM ingredient WHERE id="${id}"`;
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
    const sql = `UPDATE ingredient SET title_ingredient="${el.title_ingredient}" WHERE id="${el.id}"`;
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

class Slide {
  static async add(el) {
    const sql = `INSERT INTO banner(title, image, thumb_image) VALUES("${el.title}", "${el.image}", "${el.thumb_image}")`;
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
  static async get() {
    const sql = `SELECT * FROM banner`;
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
    const sql = `SELECT * FROM banner WHERE id="${id}"`;
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
  static async remove(id) {
    const sql = `DELETE FROM banner WHERE id="${id}"`;
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
    const sql = `UPDATE banner SET title="${el.title}", image="${el.image}", thumb_image="${el.thumb_image}"  WHERE id="${el.id}"`;
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
module.exports.Slide = Slide;
module.exports.Category = Category;
module.exports.Ingredient = Ingredient;
