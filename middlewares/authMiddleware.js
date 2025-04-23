const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  
  if (!token) {
    return res.status(403).json({ 
      error: 'Token de autenticación requerido',
      details: 'Formato esperado: Authorization: Bearer <token>' 
    });
  }

  // Verificar token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { if (err) { return res.status(401).json({ 
        error: 'Token no válido',
        details: err.message.includes('expired') 
          ? 'Token expirado' 
          : 'Token inválido' 
      });
    }
    
    req.user = { id: decoded.id, username: decoded.username, role: decoded.role }; 
    next();
  });
};

module.exports = authMiddleware;