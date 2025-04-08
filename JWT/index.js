import 'dotenv/config'
import { app } from "./app.js";
import connectDB from "./db/db.js";


connectDB()
.then(()=>{
  
  app.listen(process.env.port || 8000,()=>{
    console.log(`server is running at port ${process.env.port}`)
  })
}).catch((err)=>{
console.log("MongoDb connection failed !!!",err)
})

