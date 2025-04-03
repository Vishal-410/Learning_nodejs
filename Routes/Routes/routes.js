import { Router } from "express";
import express from 'express';
const app=express();


router.get("/user",(req,res)=>{
 res.send("Hello")
})
router.post("/user",(req,res)=>{
  // business Logic Here
})
router.put("/user/:id",(req,res)=>{
  // business Logic Here
})
router.delete('/user/:id',(req,res)=>{
  // business Logic Here
})

export default router