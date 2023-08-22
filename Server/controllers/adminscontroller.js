const db = require("../DataBase/DB_Connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function tokenGenerator({ user_id, role, full_name, email }) {
  const payload = { user_id, role, full_name, email };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
}

const handleCreateNewUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const emailLower = email.toLowerCase();

  let sql = "SELECT * FROM public.admins where email = $1";
  const oldUser = await db.query(sql, [emailLower]);

  if (oldUser.rows.length != 0) {
    res.status(409).send("Admin Already Exist.");
  } else {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    db.query(
      "INSERT INTO public.admins (full_name,email,password,phone) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, emailLower, hashedPassword, phone],
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

const checkAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const query =
      "SELECT * FROM public.admins WHERE is_delete = false ORDER BY user_id ASC";
    const results = await db.query(query);

    for (const user of results.rows) {
      const match = await bcrypt.compare(password, user.password);
      if (user.email === email && match) {
        const token = tokenGenerator(user);
        return res.status(200).json({ token });
      }
    }
    res.status(401).send("Admin doesn't exist");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleCreateNewUser,
  checkAdmin,
};
