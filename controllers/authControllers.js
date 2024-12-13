const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const signUp = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await signUp.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong User!");

    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPass = hashedPass.toString(CryptoJS.enc.Utf8);

    OriginalPass !== req.body.password && res.status(401).json("Wrong Pass");

    const accessToken = jwt.sign(
      {
        is: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "60" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

// exports.post(async (req, res) => {
//   res.cookie("jwt", "", { maxAge: 1 });
//   res.redirect("/");
// });
