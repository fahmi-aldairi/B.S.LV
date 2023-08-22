const db = require("../DataBase/DB_Connection");
const bcrypt = require("bcrypt");

const handleNewOrder = async (req, res) => {
  try {
    const {
      user_id,
      product_id,
      name,
      email,
      phone,
      city,
      street_name,
      postal_code,
      pay_method,
      name_card,
      card_number,
      security_code,
      card_expiration_date,
    } = await req.body;

    console.log(req.body);

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const insertPromises = [];

    for (const id of product_id) {
      const hashedCardNum =
        card_number !== undefined ? await bcrypt.hash(card_number, salt) : null;
      const hashedSecurityCode =
        security_code !== undefined
          ? await bcrypt.hash(security_code, salt)
          : null;

      const query =
        "INSERT INTO public.orders (user_id, product_id, name, email, phone, city, street_name, postal_code, pay_method, name_card, card_number, security_code, card_expiration_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *";

      const promise = db.query(query, [
        user_id,
        id,
        name,
        email,
        phone,
        city,
        street_name,
        postal_code,
        pay_method,
        name_card,
        hashedCardNum,
        hashedSecurityCode,
        card_expiration_date,
      ]);

      insertPromises.push(promise);
    }

    await Promise.all(insertPromises);

    res.status(200).send(`Add new Order for user_id ${user_id}`);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleGetOrders = (req, res) => {
  db.query(
    "SELECT * FROM public.orders ORDER BY order_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const handleGetOrdersByUserId = async (req, res) => {
  try {
    const { user_id } = await req.body;
    const query = "SELECT * FROM public.orders WHERE user_id = $1";
    const results = await db.query(query, [user_id]);
    res.status(200).json(results.rows);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  handleNewOrder,
  handleGetOrders,
  handleGetOrdersByUserId,
};
