const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { JWT, JWT_SECRET } = require("../config");
const zod = require("zod");
const { authMiddleware } = require("../middleware");
//create a zod object
//post request for sign in
//req provided must match the db structure ,ll do by using zod
//check the cases like if the structure matches,if existing user
//create a user and add in db
//on success will create a jwt token and return a token inresponse

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  console.log("JWT_SECRET", JWT_SECRET);
  const isUserthere = await User.findOne({
    username: req.body.username,
  });
  if (isUserthere) {
    return res.status(411).json({
      message: "User already exist",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const account = await Account.create({
    userId: user._id,
    balance: 1 + Math.random() * 10000,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId, //fow shich user u want to generate a token
    },
    JWT_SECRET
  ); //need to pass the password to create a unique key

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

router.put("/user", authMiddleware, async (req, res) => {
  const update = updateBody.safeParse(req.body);
  if (!update) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});
module.exports = router;

// madhvi user ---> token generate 'x'
// one the user signed up token value will be set as 'x'
//Now for any request further i need authentication
//for that I am introducing middleware ,it will take up the token
//check if token is valid ,then decode this token and get the user corresponds to this token
//so now I am having req.userid='madhvi's id'
//Then I can go further with the functionalities
//Note token can generate and decode via JWT token added
