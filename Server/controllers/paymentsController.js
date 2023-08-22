const db = require("../DataBase/DB_Connection");

const handleAddNewPay = async (req, res) => {
  try {
    const { user_id, total_paid } = await req.body;

    const query =
      "INSERT INTO public.payments (user_id,total_paid) VALUES ($1, $2) RETURNING *";
    const result = db.query(query, [user_id, total_paid]);
    res.status(200).send(`Add new Payments for user_id ${user_id}`);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleGetAllPayments = (req, res) => {
  db.query(
    "SELECT * FROM public.payments ORDER BY payment_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const getPaysByUserId = async (req, res) => {
  try {
    const { user_id } = await req.body;
    const query = "SELECT * FROM public.payments WHERE user_id = $1";
    const results = await db.query(query, [user_id]);
    res.status(200).json(results.rows);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  handleAddNewPay,
  handleGetAllPayments,
  getPaysByUserId,
};
