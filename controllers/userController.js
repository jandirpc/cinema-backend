const userModel = require('../models/user');
const bcrypt = require('bcryptjs');

const createUser = (req, res) => {
  const { username, email, password, role, status } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'El nombre de usuario y la contraseña son requeridos.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = { 
    username, 
    email,
    password: hashedPassword, 
    role: role || 'client', 
    status: status || 'active'
  };

  userModel.createUser(newUser, (err) => {
    if (err) {
      console.error('Error al crear usuario:', err);
      return res.status(500).json({ message: 'Error al crear usuario.' });
    }
    res.status(201).json({ message: 'Usuario creado exitosamente.' });
  });
};

const getAllUsers = (req, res) => {
  userModel.getAllUsers((err, result) => {
    if (err) return res.status(500).json({ message: 'Error al obtener usuarios.' });
    res.status(200).json(result);
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  userModel.getUserById(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al obtener usuario.' });
    if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.status(200).json(result[0]);
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email, password, role, status } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'El nombre de usuario y la contraseña son requeridos.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const updatedUser = { username, email, password: hashedPassword, role: role || 'client', status };

  userModel.updateUser(id, updatedUser, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al actualizar usuario.' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.status(200).json({ message: 'Usuario actualizado exitosamente.' });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel.deleteUser(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar usuario.' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};