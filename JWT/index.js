
import { app } from "./app.js";
import { connectDB } from "./db/db.js";
import 'dotenv/config'


connectDB().then(
  () => {
    app.listen(process.env.PORT || 8000, () => {
      console.log('Server is running on port 3000');
    }
    )
  }).catch((error)=>{
    console.log('Error connecting to database',error)
  })
