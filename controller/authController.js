const jwt = require("jsonwebtoken");

// const bcrypt = require("bcryptjs");

const Admin = require("../src/models/adminModel");

exports.prtotectedRouter = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({ error: "You don't have permission" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // { id: '66b238fa3ce7d0dd2caeef57', iat: 1723631928 }

    const user = await Admin.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Please provide valid credentials" });
    }
    req.user = user;
    next();
  } catch (err) {
    // if (err.name === "TokenExpiredError") {
    //   return res.status(401).json({ error: "Your session has expired, please log in again" });
    // }
    // if (err.name === "JsonWebTokenError") {
    //   return res.status(401).json({ error: "Invalid token, please log in again" });
    // }

    // // Catch all other errors
    // return res.status(400).json({ error: err.message });
    return res.status(400).json({ error: err.message });
  }
};
exports.signUp = async (req, res) => {
  //create user
  try {
    await Admin.create(req.body);

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, webPassword } = req.body;
    if (!email || !webPassword) throw new Error("please  credintal");
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "please provide valid credintal" });
    }
    const isMatch = webPassword === process.env.WEB_PASSWORD;
    if (!isMatch) {
      return res.status(401).json({ error: "unauthorized user" });
    }
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // token for browser
    const cookieOptions = {
      expires: new Date(
        // eslint-disable-next-line prettier/prettier
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
      SameSite: "None",
    };

    res.cookie("jwt", token, cookieOptions); //jwt name of cookie, (token)  we send to cookie of browser

    res.status(200).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// 400 for bad requests (missing email or password).
// 401 for unauthorized access (invalid login credentials).
// 403 for forbidden access (account not activated).
// 500 for internal server errors.
