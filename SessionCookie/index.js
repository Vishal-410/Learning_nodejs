import express from 'express'
import cookieSession from 'cookie-session';


const app = express();
const port = process.env.PORT || 3000;

app.use(cookieSession({
  name: 'session',
  keys: ['123456', '7890'],
  maxAge: 24 * 60 * 60 * 1000
}))



app.get('/', function (req, res, next) {
  // Update views
  req.session.views = (req.session.views || 0) + 1

  // Write response
  res.end(req.session.views + ' views')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})