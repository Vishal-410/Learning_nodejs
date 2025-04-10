import { app } from "./app.js";
import { connectDB } from "./db/db.js";

const port =process.env.PORT || 8000;

connectDB()
.then(() => {
  app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
  })
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
    });
console.log("Connecting to database...");
connectDB()
.then(() => {
  console.log("Database connection established.");
  app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
  })
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
    });