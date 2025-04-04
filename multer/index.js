import express from 'express'
const app = express();
import cors from 'cors'
const port = 3000;
import upload from './upload.js';
app.use(cors());

app.post('/upload', upload.single('file'), (req, res) => {

  res.json({ message: 'File uploaded successfully!' });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
``