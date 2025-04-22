const db = require('../config/db');

const createUser = (user, callback) => {
  const { username, email, password, role, status } = user;
  const query = 'INSERT INTO users (username, email, password, role, status) VALUES (?, ?, ?, ?, ?)';
  db.execute(query, [username, email, password, role, status], callback);
};

const getAllUsers = (callback) => {
  db.execute('SELECT * FROM users', callback);
};

const getUserById = (id, callback) => {
  db.execute('SELECT * FROM users WHERE id = ?', [id], callback);
};

const updateUser = (id, user, callback) => {
  const { username, email, password, role, status } = user;
  const query = 'UPDATE users SET username = ?, email = ?, password = ?, role = ?, status = ? WHERE id = ?';
  db.execute(query, [username, email, password, role, status, id], callback);
};

const deleteUser = (id, callback) => {
  db.execute('DELETE FROM users WHERE id = ?', [id], callback);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};