import express from 'express'
const app = express();



// // Middleware 1: Log request method and URL
// app.use((req, res, next) => {
//   console.log(`${req.method} request to ${req.url}`);
//   next();
// });

// // Middleware 2: Add a custom header
// app.use((req, res, next) => {
//   res.setHeader('X-Custom-Header', 'Middleware Chaining Example');
//   next();
// });

// Route handler
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/list/users/access', (req, res) => {
  res.redirect(301,'/list/access')
})
app.get('/list/access',(req,res)=>{
  res.send('<h1>Access List</h1>')
})

app.listen(3000, () => {
  console.log('server is running on port 3000');
})