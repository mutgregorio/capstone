import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/mongodb";
import Student from "../../../../app/models/student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    studentId,
    mobileNumber,
    email,
    course,
    yearSection,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !studentId ||
    !mobileNumber ||
    !email ||
    !course ||
    !yearSection
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await connectToDatabase();

    // Check if studentId or email already exists
    const existingStudent = await Student.findOne({
      $or: [{ studentId }, { email }],
    });
    if (existingStudent) {
      return res.status(409).json({ error: "Student ID or email already exists" });
    }

    const newStudent = new Student({
      firstName,
      lastName,
      studentId,
      mobileNumber,
      email,
      course,
      yearSection,
      status: "pending",
      balance: 0,
      totalSpent: 0,
      registrationDate: new Date(),
    });

    await newStudent.save();

    return res.status(201).json({ success: true, student: newStudent });
  } catch (error) {
    console.error("Error registering student:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
