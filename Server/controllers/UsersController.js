const db = require("../DataBase/DB_Connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function tokenGenerator({ user_id, role, full_name, email }) {
  const payload = { user_id, role, full_name, email };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
}

const handleGetAllUsers = (req, res) => {
  db.query(
    "SELECT * FROM public.users WHERE is_delete = false ORDER BY user_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const handleGetUserPerPage = async (req, res) => {
  const { offset } = req.body; // Extract the offset value from req.body
  try {
    const query =
      "SELECT * FROM public.users WHERE is_delete = false ORDER BY user_id ASC LIMIT 10 OFFSET $1";
    const results = await db.query(query, [offset]);
    res.status(200).send(results.rows); // Send the retrieved rows as the response
    console.log(req.body);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleCreateNewUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  let sql = "SELECT * FROM public.users where email = $1";
  const oldUser = await db.query(sql, [email]);

  if (oldUser.rows.length != 0) {
    res.status(409).send("User Already Exist.");
  } else {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    db.query(
      "INSERT INTO public.users (full_name,email,password,phone) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, hashedPassword, phone],
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        const { user_id, role, full_name, email } = results.rows[0];
        const token = tokenGenerator({
          user_id,
          role,
          name: full_name,
          email: email,
        });
        res.status(201).json({ token });
      }
    );
  }
};

const checkUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const query =
      "SELECT * FROM public.users WHERE is_delete = false ORDER BY user_id ASC";
    const results = await db.query(query);

    for (const user of results.rows) {
      const match = await bcrypt.compare(password, user.password);
      if (user.email === email && match) {
        const token = tokenGenerator(user);
        return res.status(200).json({ token });
      }
    }
    res.sendStatus(401);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserCount = async (req, res) => {
  try {
    const query = "SELECT * FROM public.users WHERE is_delete = false";
    const results = await db.query(query);
    res.status(200).json(results.rows.length);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = "SELECT * FROM public.users WHERE user_id = $1";
    const results = await db.query(query, [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateUserInfo = async (req, res) => {
  const id = parseInt(req.params.id);
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  // console.log(req.body);

  try {
    const objectArray = Object.keys(req.body);
    const valuestArray = Object.values(req.body);
    const values = [...valuestArray.map((ele) => ele), id];
    // console.log("values", values);
    const fahmi = objectArray
      .map((ele, index) => `${ele} = $${index + 1}`)
      .join(", ");
    const obida = objectArray.map((ele) => ele);
    // console.log("obje", objectArray);
    const checkArr = ["full_name", "email", "phone", "password"];
    let areEqual = true;

    if (objectArray.length !== checkArr.length) {
      areEqual = false;
    }
    if (objectArray.length == checkArr.length) {
      for (let i = 0; i < objectArray.length; i++) {
        if (objectArray[i] !== checkArr[i]) {
          areEqual = false;
          break;
        }
      }
      const newPass = objectArray[4];
      const newObjectArray = objectArray.slice(0, 3);
      const newfahmi = newObjectArray
        .map((ele, index) => `${ele} = $${index + 1}`)
        .join(", ");
      const hashedPassword = await bcrypt.hash(values[3], salt);
      const query = `UPDATE public.users SET ${newfahmi} , password = $${
        newObjectArray.length + 1
      } WHERE user_id = $${newObjectArray.length + 2}`;
      // console.log(query);
      try {
        const results = await db.query(query, [
          values[0],
          values[1],
          values[2],
          hashedPassword,
          values[4],
        ]);
        return res
          .status(200)
          .send(`User info with ID: ${id} has been updated with new Pass`);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    } else {
      const query = `UPDATE public.users SET ${fahmi} WHERE user_id = $${
        objectArray.length + 1
      }`;
      try {
        const results = await db.query(query, values);
        return res
          .status(200)
          .send(`User info with ID: ${id} has been updated without pass`);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "UPDATE public.users SET is_delete = $1 WHERE user_id = $2",
    [true, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  handleGetAllUsers,
  handleCreateNewUser,
  checkUser,
  getUserCount,
  getUserById,
  updateUserInfo,
  handleGetUserPerPage,
  deleteUser,
};
