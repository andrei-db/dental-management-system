import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function GET() {
  await connectDB();
  const appointments = await Appointment.find()
    .populate("patient", "name email")
    .populate("doctor", "name specialization");
  return new Response(JSON.stringify(appointments), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  try {
    const newAppt = new Appointment(body);
    await newAppt.save();

    const populated = await newAppt.populate([
      { path: "patient", select: "name email" },
      { path: "doctor", select: "name specialization" },
    ]);

    return new Response(JSON.stringify(populated), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
