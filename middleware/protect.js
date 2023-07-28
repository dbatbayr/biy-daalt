const asyncHandler = require("./asynchandler");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const MyError = require("../utils/MyError");
exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization)
    throw new MyError(
      "Nevterj orsni daraa ene uildle urgeljruulna uu",
      401
    );
  const token = req.headers.authorization.split(" ")[1];

  if (!token) throw new MyError("token hugatsa duussan baina ", 401);

  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);

  req.userID = tokenObj.id;

  req.role = tokenObj.role;
  next();
});
