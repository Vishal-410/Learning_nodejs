import express from 'express'
const app = express();
app.set('view engine','pug')

const port = 3000;

app.get('/about',(req,res)=>{
  res.render('about')
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})