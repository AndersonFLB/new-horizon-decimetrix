// src/components/PanelAdmin.js
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";

const PanelAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [activos, setActivos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  useEffect(() => {
    fetchUsuarios();
    fetchActivos();
  }, []);

  const fetchUsuarios = async () => {
    const response = await axios.get("/api/usuarios");
    setUsuarios(response.data);
  };

  const fetchActivos = async () => {
    const response = await axios.get("/api/activos");
    setActivos(response.data);
  };

  const handleOpenDialog = (usuario) => {
    setSelectedUsuario(usuario);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEliminarUsuario = async (id) => {
    await axios.delete(`/api/usuarios/${id}`);
    fetchUsuarios();
    setOpenDialog(false);
  };

  return (
    <div>
      <h2>Panel de administración</h2>

      <h3>Usuarios</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo electrónico</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.rol}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenDialog(usuario)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Activos</h3>
      {/* Tabla para mostrar activos */}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Eliminar usuario</DialogTitle>
        <DialogContent>
          <p>
            ¿Estás seguro de que quieres eliminar a {selectedUsuario?.nombre}?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={() => handleEliminarUsuario(selectedUsuario?.id)}
            color="error"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PanelAdmin;
