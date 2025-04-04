import express from 'express'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname);


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join((__dirname,'public'))));

app.get('/', (req, res) => {
  res.send('Hello Geek');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})