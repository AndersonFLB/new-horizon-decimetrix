module.exports = (sequelize, DataTypes) => {
  const Assets = sequelize.define("Assets", {
    latitud: DataTypes.FLOAT,
    longitud: DataTypes.FLOAT,
    nombre: DataTypes.STRING,
    comentarios: DataTypes.TEXT,
    fechaCreacion: DataTypes.DATE,
    usuarioRegistro: DataTypes.INTEGER, // Clave foránea al usuario
    tipo: DataTypes.ENUM("pozo", "motor", "transformador"),
  });
  return Assets;
};
