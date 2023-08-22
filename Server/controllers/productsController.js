const db = require("../DataBase/DB_Connection");

const getProductsCount = async (req, res) => {
  try {
    const query =
      "SELECT * FROM public.products WHERE is_delete = false AND out_of_stock = false";
    const results = await db.query(query);
    res.status(200).json(results.rows.length);
  } catch (error) {
    return res.status(400).json(error);
  }
};

/////////////////////////////////

const AddNewProduct = async (req, res) => {
  const file = req.file;
  const {
    partner_id,
    category,
    sub_category,
    product_name,
    product_description,
    product_count,
    product_Weight,
    product_price,
    charge,
  } = req.body;

  const namelower = product_name.toLowerCase();
  const catLower = category.toLowerCase();
  let sql = "SELECT * FROM public.products WHERE product_name = $1";
  const oldProduct = await db.query(sql, [namelower]);

  let checkQuery =
    "SELECT * FROM public.partners WHERE is_delete = false AND partner_id = $1";
  const checkPartner = await db.query(checkQuery, [partner_id]);

  if (oldProduct.rows.length !== 0) {
    return res.status(409).send("Product Already Exists.");
  } else if (checkPartner.rows.length === 0) {
    return res.status(409).send("Partner Doesn't Exist.");
  } else if (!file) {
    return res.status(400).send("No file provided");
  } else {
    const query =
      "INSERT INTO public.products (partner_id, image, category, sub_category, product_name, product_description, product_count, product_Weight, product_price, charge) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *";
    const values = [
      partner_id,
      file.filename,
      catLower,
      sub_category,
      namelower,
      product_description,
      product_count,
      product_Weight,
      product_price,
      charge,
    ];

    try {
      const data = await db.query(query, values);
      res.status(201).send("Product Added Successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

/////////////////////////////////
const getAllProducts = (req, res) => {
  db.query(
    "SELECT * FROM public.products WHERE is_delete = false ORDER BY product_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};
/////////////////////////////////
const getBreadProducts = (req, res) => {
  db.query(
    "SELECT * FROM public.products WHERE is_delete = false AND out_of_stock = false AND category = 'bread' OR category = 'all purpose' ORDER BY product_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

/////////////////////////////////

const getCakeProducts = (req, res) => {
  db.query(
    "SELECT * FROM public.products WHERE is_delete = false AND out_of_stock = false AND category = 'cake' OR category = 'all purpose' ORDER BY product_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

/////////////////////////////////
const getCookiesProducts = (req, res) => {
  db.query(
    "SELECT * FROM public.products WHERE is_delete = false AND out_of_stock = false AND category = 'cookies' OR category = 'all purpose' ORDER BY product_id ASC",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};
/////////////////////////////////

const handleprdperpage = async (req, res) => {
  const { offset } = req.body;
  try {
    const query =
      "SELECT * FROM public.products WHERE is_delete = false ORDER BY product_id ASC LIMIT 10 OFFSET $1";
    const results = await db.query(query, [offset]);
    res.status(200).send(results.rows);
    console.log(req.body);
  } catch (error) {
    return res.status(400).json(error);
  }
};

/////////////////////////////////
const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "UPDATE public.products SET is_delete = $1, out_of_stock = $2 WHERE product_id = $3",
    [true, true, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).send(`Product deleted with ID: ${id}`);
    }
  );
};
/////////////////////////////////

const updateProductInfoAdmin = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { product_name, product_count, product_price, charge } =
      await req.body;
    console.log(req.body);
    const query =
      "UPDATE public.products SET product_name = $1, product_count = $2, product_price=$3, charge=$4 WHERE product_id = $5";
    const results = await db.query(query, [
      product_name,
      product_count,
      product_price,
      charge,
      id,
    ]);
    res.status(200).send(`Product info  with ID: ${id} updated`);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateOutOfStock = async (req, res) => {
  try {
    const { product_count, product_id } = await req.body;
    console.log(req.body);
    const query =
      "UPDATE products SET product_count = $1 , out_of_stock = false  WHERE product_id = $2";
    const results = await db.query(query, [product_count, product_id]);
    res.status(200).send(`Product info  with ID: ${product_id} updated`);
  } catch (error) {
    return res.status(400).json(error);
  }
};

/////////////////////////////////

const handleGetProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const query = "SELECT * FROM public.products WHERE product_id = $1";
    const results = await db.query(query, [id]);
    res.status(200).json(results.rows);
    console.log(results.rows[0]);
  } catch (error) {
    return res.status(400).json(error);
  }
};
const handleprodeuctByuserId = async (req, res) => {
  const id = parseInt(req.params.id);
  const prdIds = [];
  try {
    const query =
      "SELECT DISTINCT product_id FROM public.orders WHERE user_id = $1";
    const results = await db.query(query, [id]);
    console.log(results.rows);
    prdIds.push(...results.rows.map((ele) => ele.product_id));
  } catch (error) {
    return res.status(400).json(error);
  }
  try {
    const query =
      "SELECT * FROM public.products WHERE product_id = ANY($1::int[]) AND is_delete = false AND out_of_stock = false";
    const results = await db.query(query, [prdIds]);
    res.status(200).json(results.rows);
    console.log(results.rows);
  } catch (error) {
    return res.status(400).json(error);
  }
};

/////////////////////////////////

const updateProduct = async (req, res) => {
  // console.log(Object.keys(req.body));
  // console.log(Object.keys(req.file).length);
  const id = parseInt(req.params.id);
  if (Object.keys(req.body).length === 0) {
    if (req.file === undefined || req.file === null) {
      try {
        const query = "SELECT * FROM public.products WHERE product_id = $1";
        const results = await db.query(query, [id]);
        const partner_id = results.rows[0].partner_id;
        const image = results.rows[0].image;
        const category = results.rows[0].category;
        const sub_category = results.rows[0].sub_category;
        const product_name = results.rows[0].product_name;
        const product_description = results.rows[0].product_description;
        const product_count = results.rows[0].product_count;
        const product_weight = results.rows[0].product_weight;
        const product_price = results.rows[0].product_price;
        const charge = results.rows[0].charge;
        const out_of_stock = results.rows[0].out_of_stock;

        const queryU =
          "UPDATE public.products SET partner_id = $1, image =$2, category = $3, sub_category = $4, product_name = $5, product_description =$6, product_count =$7, product_weight = $8, product_price =$9, charge = $10 , out_of_stock = $11 WHERE product_id = $12";
        const resultsU = await db.query(queryU, [
          partner_id,
          image,
          category,
          sub_category,
          product_name,
          product_description,
          product_count,
          product_weight,
          product_price,
          charge,
          out_of_stock,
          id,
        ]);
        res
          .status(200)
          .send(
            `Product info with ID: ${id} has been updated with existing values`
          );
      } catch (error) {
        return res.status(400).json(error);
      }
    } else {
      try {
        const file = req.file;
        const query = `UPDATE public.products SET image = $1 WHERE product_id = $2`;
        const results = await db.query(query, [file.filename, id]);
        res
          .status(200)
          .send(`Partner info with ID: ${id} has update only image}`);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
  } else if (Object.keys(req.body).length > 0) {
    if (req.file === undefined || req.file === null) {
      const objectArray = Object.keys(req.body);
      const valuestArray = Object.values(req.body);
      const values = [...valuestArray.map((ele) => ele), id];
      // console.log(valuestArray);
      console.log("values", values);
      const fahmi = objectArray
        .map((ele, index) => `${ele} = $${index + 1}`)
        .join(", ");
      // console.log("fahmi", fahmi);
      const obida = objectArray.map((ele) => ele);
      try {
        const query = `UPDATE public.products SET ${fahmi} WHERE product_id = $${
          objectArray.length + 1
        }`;
        const results = await db.query(query, values);
        res.status(200).send(`Partner info with ID: ${id} has been updated.`);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
      // console.log("dsad??");
    } else {
      const file = req.file;
      const objectArray = Object.keys(req.body);
      const valuestArray = Object.values(req.body);
      const values = [...valuestArray.map((ele) => ele), file.filename, id];
      // console.log("values", values);
      const fahmi = objectArray
        .map((ele, index) => `${ele} = $${index + 1}`)
        .join(", ");
      // console.log("fahmi", fahmi);
      const obida = objectArray.map((ele) => ele);
      try {
        const query = `UPDATE public.products SET ${fahmi}, image = $${
          objectArray.length + 1
        } WHERE product_id = $${objectArray.length + 2}`;
        // console.log("hi", query);
        const results = await db.query(query, values);
        res.status(200).send(`Partner info with ID: ${id} has been updated.`);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
  try {
  } catch (error) {
    return res.status(400).json(error);
  }
};

/////////////////////////////////

const getMainCategories = (req, res) => {
  db.query(
    "SELECT DISTINCT category FROM products ORDER BY category",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

const allPurposeSubCat = (req, res) => {
  db.query(
    "SELECT DISTINCT sub_category FROM products WHERE category = 'all purpose' ORDER BY sub_category",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};
const breadSubCat = (req, res) => {
  db.query(
    "SELECT DISTINCT sub_category FROM products WHERE category = 'bread' ORDER BY sub_category",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};
const cakeSubCat = (req, res) => {
  db.query(
    "SELECT DISTINCT sub_category FROM products WHERE category = 'cake' ORDER BY sub_category",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};
const cookiesSubCat = (req, res) => {
  db.query(
    "SELECT DISTINCT sub_category FROM products WHERE category = 'cookies' ORDER BY sub_category",
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

/////////////////////////////////

const handlePodutUpdateByUser = async (req, res) => {
  try {
    const { product_id, newproductCount } = await req.body;
    console.log(req.body);
    let newOutOfStock;
    if (newproductCount > 0) {
      newOutOfStock = false;
    } else if (newproductCount <= 0) {
      newOutOfStock = true;
    }
    const query =
      "UPDATE products SET product_count = $1 , out_of_stock = $2  WHERE product_id = $3";
    const results = await db.query(query, [
      newproductCount,
      newOutOfStock,
      product_id,
    ]);
    console.log(results);
    res.status(200).send(`Product info  with ID: ${product_id} updated`);
  } catch (error) {
    return res.status(400).json(error);
  }
};

/////////////////////////////////
/////////////////////////////////

module.exports = {
  getProductsCount,
  AddNewProduct,
  getAllProducts,
  getBreadProducts,
  getCakeProducts,
  getCookiesProducts,
  handleprdperpage,
  deleteProduct,
  updateProductInfoAdmin,
  updateOutOfStock,
  handleGetProductById,
  updateProduct,
  getMainCategories,
  allPurposeSubCat,
  breadSubCat,
  cakeSubCat,
  cookiesSubCat,
  handlePodutUpdateByUser,
  handleprodeuctByuserId,
};
