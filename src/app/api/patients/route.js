import connectDB from "@/lib/db";
import Patient from "@/models/Patient";

export async function GET() {
  await connectDB();
  const patients = await Patient.find();
  return new Response(JSON.stringify(patients), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  console.log("Received body:", body);
  try {
    const newPatient = new Patient(body);
    await newPatient.save();
    return new Response(JSON.stringify(newPatient), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
