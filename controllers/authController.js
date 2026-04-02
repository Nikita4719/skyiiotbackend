const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer");
const crypto = require("crypto");
require("dotenv").config();




//LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }


    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to login" });
  }
};



// SEND RESET LINK
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const resetToken = crypto.randomBytes(32).toString("hex");


    await prisma.users.update({
      where: { email },
      data: {
        reset_token: resetToken,
        reset_token_expiry: new Date(Date.now() + 15 * 60 * 1000), // 15 min
      },
    });


    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;


    await transporter.sendMail({
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset",
      html: `
        <h3>Password Reset</h3>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    res.json({ message: "Reset link sent to email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email" });
  }
};


//RESET PASSWORD 
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {

    const user = await prisma.users.findFirst({
      where: {
        reset_token: token,
        reset_token_expiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        reset_token: null,
        reset_token_expiry: null,
      },
    });

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error resetting password" });
  }
};




