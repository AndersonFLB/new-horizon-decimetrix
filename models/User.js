module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    rol: DataTypes.ENUM("admin", "operario"),
  });
  return User;
};
