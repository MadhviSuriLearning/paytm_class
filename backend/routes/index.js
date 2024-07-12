const express = require("express");
const { User } = require("../db");
const router = express.Router();
const userRouter = require("./user");
const accountRouter = require("./account");
//here request will come for 'api/v1' and if it was written for 'api/v1/user' this till take to this user.indexjs routes definition
router.use("/user", userRouter);
router.use("/account", accountRouter);

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    //any of the condition gets satifies
    $or: [
      {
        firstName: {
          $regex: filter, //Matches documents where the firstName field matches the regular expression specified in filter
        },
      },
      {
        lastName: {
          $regex: filter, //Matches documents where the firstName field matches the regular expression specified in filter
        },
      },
    ],
  });
  res.status(200).json({
    users: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
