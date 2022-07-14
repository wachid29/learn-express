const model = require("../model/userDataModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

//get userdata pagination
const getUsersPage = async (req, res) => {
  try {
    const { limit, page } = req.body;
    const getData = await model.getUSersPage(limit, page);
    if (getData?.rowCount) {
      res
        .status(200)
        .json({ user: getData?.rows, jumlahData: getData?.rowCount });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};
// get userdata
const getUsers = async (req, res) => {
  try {
    const getData = await model.getAllUSer();
    res
      .status(200)
      .json({ user: getData?.rows, jumlahData: getData?.rowCount });
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};
//find userdata by name
const findNameUsers = async (req, res) => {
  //cari berdasarkan name
  try {
    const { name } = req.body;
    const getData = await model.findByName(name);
    if (getData?.rowCount) {
      res
        .status(200)
        .json({ user: getData?.rows, jumlahData: getData?.rowCount });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};
//addd userdata
const addUsers = async (req, res) => {
  try {
    const { name, email, phone_number, password, confirm_pass } = req.body;
    if (!(name && email && phone_number && password && confirm_pass)) {
      res.status(400).send("data tidak boleh kosong");
    } else {
      const fixname = name.trim();
      const fixemail = email.trim();
      const fixphone_number = phone_number.trim();

      const findEmail = await model.findByEmail(fixemail);

      if (findEmail?.rowCount) {
        res.status(400).send("email sudah terdaftar");
      } else {
        if (password === confirm_pass) {
          const salt = bcrypt.genSaltSync(5); // generate random string
          const fixPassword = bcrypt.hashSync(password, salt); // hash password

          const postData = await model.addedUsers(
            fixname,
            fixemail,
            fixphone_number,
            fixPassword
          );
          res.status(200).send("data berhasil di tambah");
        } else {
          res.status(400).send("password dan confirm password tidak sesuai");
        }
      }
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};
//edit userdata by id
const editUsers = async (req, res) => {
  try {
    const { email } = req.body;

    const findEmail = await model.findByEmail(email);
    if (findEmail?.rowCount) {
      res.status(400).send("email sudah terdaftar");
    } else {
      const { id, name, email, phone_number, password, confirm_pass } =
        req.body;

      // const fixname = name.trim();
      // const fixemail = email.trim();
      // const fixphone_number = phone_number.trim();
      const getData = await model.findbyID(id);
      if (getData?.rowCount) {
        if (password === confirm_pass) {
          const salt = bcrypt.genSaltSync(5); // generate random string
          let fixPassword;
          fixPassword = bcrypt.hashSync(password, salt); // hash password

          let inputName = name || getData?.rows[0].name;
          let inputEmail = email || getData?.rows[0].email;
          let inputPhone = phone_number || getData?.rows[0].phone_number;
          let inputPass = fixPassword || getData?.rows[0].password;

          let massage = "";
          if (name) massage += "name, ";
          if (email) massage += "email, ";
          if (phone_number) massage += "phone_number, ";
          if (password) massage += "password, ";

          const patchData = await model.editedUsers(
            inputName,
            inputEmail,
            inputPhone,
            inputPass,
            id
          );
          res.status(200).send(`${massage}berhasil di edit`);
        } else {
          res.status(400).send("confirm_pass tidak valid");
        }
      } else {
        res.status(400).send("data tidak ditemukan");
      }
    }
  } catch (error) {
    console.log("err", error);
    //console.log(fixname, fixemail, fixphone_number);
    res.status(400).send("ada yang error");
  }
};
// delete userdata by id
const deleteUsers = async (req, res) => {
  try {
    const { id } = req.body;

    const getData = await model.findbyID(id);
    if (getData?.rowCount) {
      //const { id } = req.body;
      const deleteData = await model.deletedUsers(id);
      res.send(`data id ke-${id} berhasil dihapus`);
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const recipeByUser = async (req, res) => {
  try {
    const { id } = req.body;
    const getData = await model.findbyID(id);
    if (getData?.rowCount) {
      const { id } = req.body;
      const getRecipeUser = await model.getRecipeUser(id);
      res.status(200).json({
        user: getData?.rows,
        recipe: getRecipeUser?.rows,
        jumlahData: getRecipeUser?.rowCount,
      });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const editPhoto = async (req, res) => {
  try {
    const { email } = req.body;
    if (req?.file) {
      const foto = `http://localhost:8001/profiles/${req.file.filename}`;
      const findEmail = await model.findByEmail(email);

      if (findEmail?.rowCount) {
        const editedPhoto = await model.editedPhoto(foto, email);

        res.status(200).send(`photo profile berhasil di edit`);
      } else {
        res.status(400).send("email belum terdaftar");
      }
    } else {
      res.status(400).send("silakan pilih file yang akan diupload");
    }
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getUsersPage,
  getUsers,
  findNameUsers,
  addUsers,
  editUsers,
  deleteUsers,
  recipeByUser,
  editPhoto,
};
