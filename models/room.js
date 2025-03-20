const db = require('../config/db');

// Función para crear una nueva sala 
const createRoom = (room, callback) => {
  const { name, movie_name, movie_poster_url, num_rows, num_columns, schedule, price, duration, genre } = room;
  const query = 'INSERT INTO rooms (name, movie_name, movie_poster_url, num_rows, num_columns, schedule, price, duration, genre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.execute(query, [name, movie_name, movie_poster_url, num_rows, num_columns, schedule, price, duration, genre], callback);
};

// Función para obtener todas las salas
const getAllRooms = (callback) => {
  const query = 'SELECT * FROM rooms';
  db.execute(query, callback);
};

// Función para obtener una sala por ID
const getRoomById = (id, callback) => {
  const query = 'SELECT * FROM rooms WHERE id = ?';
  db.execute(query, [id], callback);
};

// Función para actualizar una sala
const updateRoom = (id, room, callback) => {
  const { name, movie_name, movie_poster_url, num_rows, num_columns, schedule, price, duration, genre } = room;
  const query = 'UPDATE rooms SET name = ?, movie_name = ?, movie_poster_url = ?, num_rows = ?, num_columns = ?, schedule = ?, price = ?, duration = ?, genre = ? WHERE id = ?';
  db.execute(query, [name, movie_name, movie_poster_url, num_rows, num_columns, schedule, price, duration, genre, id], callback);
};

// Función para eliminar una sala
const deleteRoom = (id, callback) => {
  const query = 'DELETE FROM rooms WHERE id = ?';
  db.execute(query, [id], callback);
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
};
