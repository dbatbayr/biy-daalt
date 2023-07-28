const userModel = require("../model/user");
const asyncHandler = require("../middleware/asynchandler");
const MyError = require("../utils/MyError");
// {url}/api/users/register
exports.register = asyncHandler(async (req, res, next) => 
{
  const user = await userModel.create(
  {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const token = await user.getJsonWebToken();
  res.status(200).send(
  {
    success: user,
    token: token,
  })
})

// {url}/api/users/login
exports.login = asyncHandler(async (req, res, next) => 
{
  // оролтыг шалгах
  const { email, password } = req.body;
  if (!email || !password)
    throw new MyError("email esvel password dutuu baina", 400);

  const user = await userModel.findOne({ email }).select("+password");
  const ok = await user.checkPassword(password);

  if (!ok) throw new MyError("email bolon pass buruu baina", 401);
  res.status(200).send(
  {
    success: true,
    login: true,
    token: user.getJsonWebToken(),
    user: user,
  })
})
// {url}/api/users/


exports.getUsers = asyncHandler(async (req, res, next) => 
{
  const user = await userModel.find();
  if (!user) throw new MyError("Hereglegch oldsongui medeelle shalgaad ahin orold", 400);
  res.status(200).send(
  {
    success: true,
    users: user,
  })
})

// {url}/api/users/
exports.getUser = asyncHandler(async (req, res, next) => 
{
  const user = await userModel.findById(req.params.id);
  if (!user)
    throw new MyError(`${req.params.id}-id tai hereglegch oldsongui`, 400);
  res.status(200).send(
    {
    success: true,
    getUser: user,
  });
});
