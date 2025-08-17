import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";

export async function GET() {
  await connectDB();
  const doctors = await Doctor.find();
  return new Response(JSON.stringify(doctors), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  try {
    const newDoctor = new Doctor(body);
    await newDoctor.save();
    return new Response(JSON.stringify(newDoctor), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
