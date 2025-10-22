import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: false },
  phone: { type: String },
  cnic: { type: String },
  profileImage: { type: String },
}, { timestamps: true });

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;