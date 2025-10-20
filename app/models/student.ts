import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
  firstName: string;
  lastName: string;
  studentId: string;
  mobileNumber: string;
  email: string;
  course: string;
  yearSection: string;
  status: "pending" | "verified" | "suspended";
  balance: number;
  totalSpent: number;
  registrationDate: Date;
}

const StudentSchema: Schema<IStudent> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  yearSection: { type: String, required: true },
  status: { type: String, enum: ["pending", "verified", "suspended"], default: "pending" },
  balance: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  registrationDate: { type: Date, default: Date.now },
});

const Student: Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
