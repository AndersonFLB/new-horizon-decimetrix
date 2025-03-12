const express = require("express");
const router = express.Router();
const { Assets } = require("../models/Assets");
const { verifyToken, authorizeRole } = require("../middleware/auth");

router.post(
  "/",
  verifyToken,
  authorizeRole(["operario", "admin"]),
  async (req, res) => {
    // Crea un nuevo activo
  }
);

router.get("/", verifyToken, async (req, res) => {
  // Lista los activos (filtra por usuario si es operario)
});

// Crear activo
router.post(
  "/",
  verifyToken,
  authorizeRole(["operario", "admin"]),
  async (req, res) => {
    const { latitud, longitud, nombre, comentarios, tipo } = req.body;
    const activo = await Activo.create({
      latitud,
      longitud,
      nombre,
      comentarios,
      tipo,
      usuarioRegistro: req.usuario.id,
    });
    res.send(activo);
  }
);

// Obtener activos
router.get("/", verifyToken, async (req, res) => {
  if (req.usuario.rol === "operario") {
    const activos = await Activo.findAll({
      where: { usuarioRegistro: req.usuario.id },
    });
    res.send(activos);
  } else {
    const activos = await Activo.findAll();
    res.send(activos);
  }
});

// Actualizar activo
router.put("/:id", verifyToken, async (req, res) => {
  const { latitud, longitud, nombre, comentarios, tipo } = req.body;
  const activo = await Activo.findByPk(req.params.id);
  if (
    req.usuario.rol === "operario" &&
    activo.usuarioRegistro !== req.usuario.id
  ) {
    return res
      .status(403)
      .send("No tienes permiso para actualizar este activo");
  }
  await Activo.update(
    { latitud, longitud, nombre, comentarios, tipo },
    { where: { id: req.params.id } }
  );
  res.send("Activo actualizado");
});

// Eliminar activo
router.delete("/:id", verifyToken, async (req, res) => {
  const activo = await Activo.findByPk(req.params.id);
  if (
    req.usuario.rol === "operario" &&
    activo.usuarioRegistro !== req.usuario.id
  ) {
    return res.status(403).send("No tienes permiso para eliminar este activo");
  }
  await Activo.destroy({ where: { id: req.params.id } });
  res.send("Activo eliminado");
});

module.exports = router;
