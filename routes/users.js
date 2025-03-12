// routes/usuarios.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Usuario } = require("../models");
const { verifyToken, authorizeRole } = require("../middleware/auth");

// Crear usuario (solo administradores)
router.post("/", verifyToken, authorizeRole(["admin"]), async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const usuario = await Usuario.create({
    nombre,
    email,
    password: hashedPassword,
    rol,
  });
  res.send(usuario);
});

// Obtener usuarios (solo administradores)
router.get("/", verifyToken, authorizeRole(["admin"]), async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.send(usuarios);
});

// Actualizar usuario (solo administradores)
router.put("/:id", verifyToken, authorizeRole(["admin"]), async (req, res) => {
  const { nombre, email, rol } = req.body;
  await Usuario.update(
    { nombre, email, rol },
    { where: { id: req.params.id } }
  );
  res.send("Usuario actualizado");
});

// Eliminar usuario (solo administradores)
router.delete(
  "/:id",
  verifyToken,
  authorizeRole(["admin"]),
  async (req, res) => {
    await Usuario.destroy({ where: { id: req.params.id } });
    res.send("Usuario eliminado");
  }
);

module.exports = router;
