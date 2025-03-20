const db = require('../config/db');

// Función para verificar si el asiento ya está reservado
const checkSeatAvailability = (room_id, seat_row, seat_column, callback) => {
    const query = 'SELECT * FROM reservations WHERE room_id = ? AND seat_row = ? AND seat_column = ? AND status = "reserved"';
    db.execute(query, [room_id, seat_row, seat_column], callback);
  };
  
  // Función para crear una nueva reserva
  const createReservation = (reservation, callback) => {
    const { user_id, room_id, seat_row, seat_column, reservation_date, status } = reservation;
    const query = 'INSERT INTO reservations (user_id, room_id, seat_row, seat_column, reservation_date, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.execute(query, [user_id, room_id, seat_row, seat_column, reservation_date, status], callback);
  };

// Función para obtener todas las reservaciones
const getAllReservations = (callback) => {
  const query = 'SELECT * FROM reservations';
  db.execute(query, callback);
};

// Función para obtener una reservación por su ID
const getReservationById = (id, callback) => {
  const query = 'SELECT * FROM reservations WHERE id = ?';
  db.execute(query, [id], callback);
};

// Función para actualizar una reservación
const updateReservation = (id, reservation, callback) => {
  const { user_id, room_id, seat_row, seat_column, reservation_date, status } = reservation;
  const query = 'UPDATE reservations SET user_id = ?, room_id = ?, seat_row = ?, seat_column = ?, reservation_date = ?, status = ? WHERE id = ?';
  db.execute(query, [user_id, room_id, seat_row, seat_column, reservation_date, status, id], callback);
};

// Función para eliminar una reservación
const deleteReservation = (id, callback) => {
  const query = 'DELETE FROM reservations WHERE id = ?';
  db.execute(query, [id], callback);
};

const getRoomById = (id, callback) => {
    const query = 'SELECT * FROM rooms WHERE id = ?';
    db.execute(query, [id], callback);
  };

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getRoomById,
  checkSeatAvailability,
};
