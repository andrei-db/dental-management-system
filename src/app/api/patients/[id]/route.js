import connectDB from "@/lib/db";
import Patient from "@/models/Patient";

export async function GET(req, { params }) {
  await connectDB();
  const patient = await Patient.findById(params.id);
  return new Response(JSON.stringify(patient), { status: 200 });
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();
  const updated = await Patient.findByIdAndUpdate(params.id, body, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Patient.findByIdAndDelete(params.id);
  return new Response(JSON.stringify({ message: "Patient deleted" }), { status: 200 });
}
