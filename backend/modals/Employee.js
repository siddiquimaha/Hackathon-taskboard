import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, unique: true, required: true }, // unique will generate error 11000 in console
    password: { type: String, required: true, minLength: 6 },
    designation : { type: String, required: true },
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);

export default EmployeeModel;
