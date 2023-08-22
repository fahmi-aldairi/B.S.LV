const db = require("../DataBase/DB_Connection");

const AddNewPartner = async (req, res) => {
  const file = req.file;
  const { name, phone, email } = req.body;
  const emailLower = email.toLowerCase();
  // console.log(file);

  console.log(req.file !== undefined);

  if (!file) {
    return res.status(400).send("No file provided");
  }

  let sql = "SELECT * FROM public.partners WHERE email = $1";
  const oldPartner = await db.query(sql, [emailLower]);

  if (oldPartner.rows.length !== 0) {
    res.status(409).send("Partner Already Exists.");
  } else {
    db.query(
      "INSERT INTO public.partners (name, phone, email, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, phone, emailLower, file.filename],
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        res.status(201).send("Partner Added Successfully");
      }
    );
  }
};

////////////////////////////////////

const handleGetAllPartners = (req, res) => {
  db.query(
    "SELECT * FROM public.partners WHERE is_delete = false ORDER BY partner_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

////////////////////////////////////

const handleGetPartnerById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = "SELECT * FROM public.partners WHERE partner_id = $1";
    const results = await db.query(query, [id]);
    res.status(200).json(results.rows);
    // console.log(results.rows[0]);
  } catch (error) {
    return res.status(400).json(error);
  }
};

////////////////////////////////////

const deletePartner = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query =
      "UPDATE public.partners SET is_delete = $1 WHERE partner_id = $2";
    const results = await db.query(query, [true, id]);
    const updateProducts =
      "UPDATE public.products SET is_delete = $1 WHERE partner_id = $2";
    const result = await db.query(updateProducts, [true, id]);
    res.status(200).send(`Partner deleted with ID: ${id}`);
  } catch (error) {
    return res.status(400).json(error);
  }
};

////////////////////////////////////

const UpdatePartner = async (req, res) => {
  // console.log(Object.keys(req.body).length);
  console.log(Object.keys(req.body));
  console.log(Object.values(req.body));
  // const objectArray = Object.keys(req.body);
  // const valuestArray = Object.values(req.body);
  try {
    const id = parseInt(req.params.id);
    if (Object.keys(req.body).length === 0) {
      if (req.file === undefined || req.file === null) {
        try {
          const query = "SELECT * FROM public.partners WHERE partner_id = $1";
          const results = await db.query(query, [id]);
          const name = results.rows[0].name;
          const email = results.rows[0].email;
          const phone = results.rows[0].phone;
          const existingFile = results.rows[0].image;

          const queryU =
            "UPDATE public.partners SET name = $1, phone = $2, email = $3, image = $4 WHERE partner_id = $5";
          const resultsU = await db.query(queryU, [
            name,
            phone,
            email,
            existingFile,
            id,
          ]);

          res
            .status(200)
            .send(
              `Partner info with ID: ${id} has been updated with existing values`
            );
        } catch (error) {
          return res.status(400).json(error);
        }
      } else {
        try {
          const file = req.file;
          const query = `UPDATE public.partners SET image = $1 WHERE partner_id = $2`;
          const results = await db.query(query, [file.filename, id]);
          res
            .status(200)
            .send(`Partner info with ID: ${id} has update only image}`);
        } catch (error) {
          return res.status(400).json(error);
        }
      }
    } else if (Object.keys(req.body).length === 1) {
      if (req.file === undefined || req.file === null) {
        try {
          const query = `UPDATE public.partners SET ${Object.keys(
            req.body
          )[0].toLowerCase()} = $1 WHERE partner_id = $2`;
          const results = await db.query(query, [
            Object.values(req.body)[0].toLowerCase(),
            id,
          ]);
          res
            .status(200)
            .send(
              `Partner info with ID: ${id} has update ${
                Object.keys(req.body)[0]
              }`
            );
        } catch (error) {
          return res.status(400).json(error);
        }
      } else {
        try {
          const file = req.file;
          const query = `UPDATE public.partners SET ${Object.keys(
            req.body
          )[0].toLowerCase()} = $1 , image = $2 WHERE partner_id = $3`;
          const results = await db.query(query, [
            Object.values(req.body)[0].toLowerCase(),
            file.filename,
            id,
          ]);
          res
            .status(200)
            .send(
              `Partner info with ID: ${id} has update ${Object.keys(req.body)}`
            );
        } catch (error) {
          return res.status(400).json(error);
        }
      }
    } else if (Object.keys(req.body).length === 2) {
      if (req.file === undefined || req.file === null) {
        try {
          const query = `UPDATE public.partners SET ${Object.keys(
            req.body
          )[0].toLowerCase()} = $1 , ${Object.keys(
            req.body
          )[1].toLowerCase()} = $2 WHERE partner_id = $3`;
          const results = await db.query(query, [
            Object.values(req.body)[0].toLowerCase(),
            Object.values(req.body)[1].toLowerCase(),
            id,
          ]);
          res
            .status(200)
            .send(
              `Partner info with ID: ${id} has update ${Object.keys(req.body)}`
            );
        } catch (error) {
          return res.status(400).json(error);
        }
      } else {
        try {
          const file = req.file;
          const query = `UPDATE public.partners SET ${Object.keys(
            req.body
          )[0].toLowerCase()} = $1 , ${Object.keys(
            req.body
          )[1].toLowerCase()} = $2 , image = $3 WHERE partner_id = $4`;
          const results = await db.query(query, [
            Object.values(req.body)[0].toLowerCase(),
            Object.values(req.body)[1].toLowerCase(),
            file.filename,
            id,
          ]);
          res
            .status(200)
            .send(
              `Partner info with ID: ${id} has update ${Object.keys(req.body)}`
            );
        } catch (error) {
          return res.status(400).json(error);
        }
      }
    } else if (Object.keys(req.body).length === 3) {
      if (req.file === undefined || req.file === null) {
        try {
          const query = `UPDATE public.partners SET ${Object.keys(
            req.body
          )[0].toLowerCase()} = $1 , ${Object.keys(
            req.body
          )[1].toLowerCase()} = $2 , ${Object.keys(
            req.body
          )[2].toLowerCase()} = $3 WHERE partner_id = $4`;
          const results = await db.query(query, [
            Object.values(req.body)[0].toLowerCase(),
            Object.values(req.body)[1].toLowerCase(),
            Object.values(req.body)[2].toLowerCase(),
            id,
          ]);
          res
            .status(200)
            .send(
              `Partner info with ID: ${id} has update ${Object.keys(req.body)}`
            );
        } catch (error) {
          return res.status(400).json(error);
        }
      } else {
        try {
          const file = req.file;
          const query = `UPDATE public.partners SET ${Object.keys(
            req.body
          )[0].toLowerCase()} = $1 , ${Object.keys(
            req.body
          )[1].toLowerCase()} = $2 ,  ${Object.keys(
            req.body
          )[2].toLowerCase()} = $3 , image = $4 WHERE partner_id = $5`;
          const results = await db.query(query, [
            Object.values(req.body)[0].toLowerCase(),
            Object.values(req.body)[1].toLowerCase(),
            Object.values(req.body)[2].toLowerCase(),
            file.filename,
            id,
          ]);
          res
            .status(200)
            .send(
              `Partner info with ID: ${id} has update ${Object.keys(req.body)}`
            );
        } catch (error) {
          return res.status(400).json(error);
        }
      }
    } else {
      res.status(400).Send("Alloooo");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  AddNewPartner,
  handleGetAllPartners,
  handleGetPartnerById,
  deletePartner,
  UpdatePartner,
};
