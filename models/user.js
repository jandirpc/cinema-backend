const db = require('../config/db');

// Función para crear un nuevo usuario
const createUser = (user, callback) => {
  const { username, password, role, status } = user;
  const query = 'INSERT INTO users (username, password, role, status) VALUES (?, ?, ?, ?)';
  db.execute(query, [username, password, role, status], callback);
};

// Función para obtener todos los usuarios
const getAllUsers = (callback) => {
  const query = 'SELECT * FROM users';
  db.execute(query, callback);
};

// Función para obtener un usuario por su ID
const getUserById = (id, callback) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  db.execute(query, [id], callback);
};

// Función para actualizar un usuario
const updateUser = (id, user, callback) => {
  const { username, password, role, status } = user;
  const query = 'UPDATE users SET username = ?, password = ?, role = ?, status = ? WHERE id = ?';
  db.execute(query, [username, password, role, status, id], callback);
};

// Función para eliminar un usuario
const deleteUser = (id, callback) => {
  const query = 'DELETE FROM users WHERE id = ?';
  db.execute(query, [id], callback);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
