import Admin from "../models/admin.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createdAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import { email } from "zod";

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminFound = await Admin.findOne({ email });
    if (adminFound)
      return res.status(400).json(["The email is already in use"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newAdmin = Admin({
      email,
      password: passwordHash,
    });

    const adminSaved = await newAdmin.save();

    const token = await createdAccessToken({ id: adminSaved._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // obligatorio si usas https
      sameSite: "none", // necesario si frontend y backend son diferentes dominios
    });

    res.json({
      id: adminSaved._id,
      email: adminSaved.email,
      token: token, // Envía el token en el cuerpo de la respuesta
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await Admin.findOne({ email });
    if (!userFound) return res.status(400).json(["User not found"]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Incorrect Password"]);

    const token = await createdAccessToken({ id: userFound._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // obligatorio si usas https
      sameSite: "none", // necesario si frontend y backend son diferentes dominios
    });

    res.json({
      id: userFound._id,
      email: userFound.email,
      token: token, // Envía el token en el cuerpo de la respuesta
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // si usas https
    sameSite: "none",
  });
  return res.json({ message: "Logged out" });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const userFound = await Admin.findById(user.id);

    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: adminSaved._id,
      email: adminSaved.email,
      token: token, // Envía el token en el cuerpo de la respuesta
    });
  });
};
