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

    if (!user) {
      return res.status(401).json({ message: "Wrong User!" });
    }

    const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPass = hashedPass.toString(CryptoJS.enc.Utf8);

    if (originalPass !== req.body.password) {
      return res.status(401).json({ message: "Wrong Password!" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "1h" }
    );

    const { password, ...others } = user._doc;
    return res.status(200).json({ ...others, accessToken });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};


// exports.post(async (req, res) => {
//   res.cookie("jwt", "", { maxAge: 1 });
//   res.redirect("/");
// });
