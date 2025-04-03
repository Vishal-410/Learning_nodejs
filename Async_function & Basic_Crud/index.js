import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import { Post } from './Post.model.js';
import cors from 'cors'

import connectDB from './db.js';

const app = express();
const port = 3000;
connectDB();

app.use(express.json());
app.use(cors());

// console.log('Starting...');

// fs.readFile('./home/myfile.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error('File Read Error:', err);
//     return;
//   }
//   console.log('Data From File: ' + data);
// });

// function hello() {
//   console.log('End! Really?');
// }

// hello();
app.post('/post',async(req,res)=>{
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json({ message: 'Post created successfully' });
  }catch(err){
    console.log(err)
  }
})
app.get('/post',async(req,res)=>{
  try {
    const posts = await Post.find();
    res.json(posts);
    }catch(err){
      console.log(err)
      }
})
app.put("/post/:id",async(req,res)=>{
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.json(post);
    } catch (err) {
      console.log(err);
    }
})
app.delete("/post/:id",async(req,res)=>{
  try {
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      console.log(err);
      }
      })


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
