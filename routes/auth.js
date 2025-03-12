const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Usuario } = require("../models");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Usuario.findOne({ where: { email } });
  if (!user)
    return res.status(400).send("Correo electrónico o contraseña incorrectos");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).send("Correo electrónico o contraseña incorrectos");

  const token = jwt.sign({ id: user.id, rol: user.rol }, "tu_clave_secreta"); // Reemplaza con tu clave secreta
  res.send({ token });
});
