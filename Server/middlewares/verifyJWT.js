const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (authHeader == "Bearer null") return res.json({ error: "Null token" });
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.user = {
    user_id: user.user_id,
    role: user.role,
    full_name: user.full_name,
    email: user.email,
  };
  // console.log(token);
  next();
};

// const verifyJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(" ")[1];
//   if (authHeader == "Bearer null") return res.json({ error: "Null token" });
//   const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//   req.user = {
//     user_id: user.user_id,
//     role: user.role,
//     full_name: user.full_name,
//     email: user.email,
//   };
//   // console.log(req.user);
//   if (user.role === "Admin" || user.role === "admin") {
//     next();
//   } else {
//     res.status(401);
//   }
// };

module.exports = { verifyJWT };
