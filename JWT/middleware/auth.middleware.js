import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).send('Access Denied');


  if (!token.startsWith('Bearer ')) {
    return res.status(400).send('Invalid token format. Expected "Bearer <token>"');
  }


  const actualToken = token.split(' ')[1].trim();

  try {
    const decoded = jwt.verify(actualToken, process.env.SECRET_KEY);


    req.userId = decoded.userId;


    next();
  } catch (error) {

    console.error('Error during token verification:', error);
    res.status(400).send('Invalid Token');
  }
};

export { authMiddleware };
