const jwt = require('jsonwebtoken');

const checkAuth = async (req, res) => {
  console.log('Cookies recibidas en el backend:', req.cookies); 

  if (!token) {
    console.error('Token no encontrado en cookies');
    return res.status(401).json({ message: 'Authentication token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET); 
    console.log('Token decodificado:', decoded);
    req.user = decoded; 
    return res.status(200).json({ userId: decoded.id, message: 'Authenticated' });
  } catch (error) {
    console.error('Error al verificar el token:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { checkAuth };
