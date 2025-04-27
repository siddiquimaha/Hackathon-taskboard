import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import EmployeeModel from './modals/Employee.js';
import taskroutes from './routes/taskroutes.js'


const app = express();
app.use(express.json())
app.use(cors())
app.use(taskroutes)

app.get('/', (req, res) => {
    res.send("express server is working");
});
mongoose.connect("mongodb+srv://siddiquimahajabeen:mahaAuth123@cluster0.g5uuy.mongodb.net/employee")
.then( () => console.log("Mongodb compass connected and working"))
.catch( (err) => console.error("error", err)); 

//for data from frontend
app.post('/register', async (req, res) => {
  try {
    console.log("data received from frontend", req.body);
    // for user exist already we can check before creating new

    const existEmployee = await EmployeeModel.findOne({email : req.body.email})
    if (existEmployee) {
        return res.status(400).json({message : "you are already exist in our DB, plz login. "});
    }

    const newEmployee = await EmployeeModel.create(req.body);
    res.status(201).json(newEmployee);

  } catch (error) {
    console.error("Error in /register:", error);
    // if our backend return error like 11000 for email unique will do this
    // if (error.code === 11000) {
    //   return res.status(400).json({message : "email already registered"});
    // }

    res.status(500).json({ error: "Server error" });
  }
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server at  running http://localhost:${port}`);
});