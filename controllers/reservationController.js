const reservationModel = require('../models/reservation');
const roomModel = require('../models/room'); 

// Crear una nueva reservación
const createReservation = (req, res) => {
  const { user_id, room_id, seat_row, seat_column, reservation_date, status } = req.body;

  // Validar que las filas y columnas no excedan los límites de la sala
  roomModel.getRoomById(room_id, (err, result) => {
    if (err) {
      console.error('Error al obtener la sala:', err);
      return res.status(500).json({ message: 'Error al obtener la sala.' });
    }

    // Si no existe la sala
    if (result.length === 0) {
      return res.status(404).json({ message: 'Sala no encontrada.' });
    }

    // Obtener los valores de num_rows y num_columns de la sala
    const { num_rows, num_columns } = result[0];

    // Verificar que las filas y columnas no excedan los límites
    if (seat_row > num_rows || seat_column > num_columns) {
      return res.status(400).json({ message: `Las filas no pueden exceder ${num_rows} y las columnas no pueden exceder ${num_columns}.` });
    }

    // Obtener la fecha actual
    const currentDate = new Date();
    
    // Convertir la fecha de la reserva a un objeto Date
    const reservationDate = new Date(reservation_date);
    
    // Calcular la fecha máxima permitida (8 días a partir de la fecha actual)
    const maxDate = new Date(currentDate);
    maxDate.setDate(currentDate.getDate() + 8); // Sumar 8 días a la fecha actual

    // Verificar si la fecha de la reservación es mayor a la fecha máxima
    if (reservationDate > maxDate) {
      return res.status(400).json({ message: 'La fecha de la reserva no puede ser más de 8 días a partir de la fecha actual.' });
    }

    // Validación para asegurarse de que el asiento no esté reservado
    reservationModel.checkSeatAvailability(room_id, seat_row, seat_column, (err, result) => {
      if (err) {
        console.error('Error al verificar la disponibilidad del asiento:', err);
        return res.status(500).json({ message: 'Error al verificar la disponibilidad del asiento.' });
      }

      // Si ya hay una reserva en ese asiento, retornar error
      if (result.length > 0) {
        return res.status(400).json({ message: 'Este asiento ya está reservado.' });
      }

      // Lógica para crear la reserva si la fila y columna están disponibles
      const newReservation = { user_id, room_id, seat_row, seat_column, reservation_date, status };

      reservationModel.createReservation(newReservation, (err, result) => {
        if (err) {
          console.error('Error al crear la reserva:', err);
          return res.status(500).json({ message: 'Error al crear la reserva.' });
        }
        res.status(201).json({ message: 'Reserva creada exitosamente.' });
      });
    });
  });
};

  
// Obtener todas las reservaciones
const getAllReservations = (req, res) => {
  reservationModel.getAllReservations((err, result) => {
    if (err) {
      console.error('Error al obtener reservaciones:', err);
      return res.status(500).json({ message: 'Error al obtener reservaciones.' });
    }
    res.status(200).json(result);
  });
};

// Obtener una reservación por ID
const getReservationById = (req, res) => {
  const { id } = req.params;

  reservationModel.getReservationById(id, (err, result) => {
    if (err) {
      console.error('Error al obtener reservación:', err);
      return res.status(500).json({ message: 'Error al obtener reservación.' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Reservación no encontrada.' });
    }
    res.status(200).json(result[0]);
  });
};

// Actualizar una reservación
const updateReservation = (req, res) => {
  const { id } = req.params;
  const { user_id, room_id, seat_row, seat_column, reservation_date, status } = req.body;

  if (!user_id || !room_id || !seat_row || !seat_column || !reservation_date || !status) {
    return res.status(400).json({ message: 'Todos los campos son requeridos.' });
  }

  const updatedReservation = { user_id, room_id, seat_row, seat_column, reservation_date, status };

  reservationModel.updateReservation(id, updatedReservation, (err, result) => {
    if (err) {
      console.error('Error al actualizar reservación:', err);
      return res.status(500).json({ message: 'Error al actualizar reservación.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservación no encontrada.' });
    }
    res.status(200).json({ message: 'Reservación actualizada exitosamente.' });
  });
};

// Eliminar una reservación
const deleteReservation = (req, res) => {
  const { id } = req.params;

  reservationModel.deleteReservation(id, (err, result) => {
    if (err) {
      console.error('Error al eliminar reservación:', err);
      return res.status(500).json({ message: 'Error al eliminar reservación.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservación no encontrada.' });
    }
    res.status(200).json({ message: 'Reservación eliminada exitosamente.' });
  });
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
