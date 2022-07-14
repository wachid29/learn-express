const db = require("../db");
// db get all user
const getAllUSer = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM userdata ORDER BY id ASC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
// db get user with pagination
const getUSersPage = (limit, page) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM userdata ORDER BY id ASC LIMIT $1 OFFSET $2`,
      [limit, limit * (page - 1)],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
// db find user by name
const findByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM userdata WHERE name LIKE $1`,
      [`%${name}%`],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
// db add new user
const addedUsers = (fixname, fixemail, fixphone_number, fixPassword) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO userdata (name, email, phone_number, password) 
    VALUES ($1,$2,$3,$4)`,
      [fixname, fixemail, fixphone_number, fixPassword],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
// db find user by id
const findbyID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM userdata WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
// db edit user by id
const editedUsers = (inputName, inputEmail, inputPhone, inputPass, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE userdata SET name= $1, email=$2, phone_number=$3, password=$4 WHERE id=$5`,
      [inputName, inputEmail, inputPhone, inputPass, id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
// db delete user by id
const deletedUsers = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM userdata WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getRecipeUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM recipe WHERE user_id =$1`,
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM userdata WHERE email=$1`,
      [email],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const editedPhoto = (foto, email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE userdata SET photo_profile=$1 WHERE email=$2`,
      [foto, email],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  getAllUSer,
  getUSersPage,
  findByName,
  addedUsers,
  findbyID,
  editedUsers,
  deletedUsers,
  getRecipeUser,
  findByEmail,
  editedPhoto,
};
