import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const appointment = await Appointment.findById(id)
      .populate("patient", "name email")
      .populate("doctor", "name specialization");

    if (!appointment) {
      return new Response(JSON.stringify({ error: "Appointment not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(appointment), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();

  try {
    const updated = await Appointment.findByIdAndUpdate(id, body, { new: true })
      .populate("patient", "name email")
      .populate("doctor", "name specialization");

    if (!updated) {
      return new Response(JSON.stringify({ error: "Appointment not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(JSON.stringify({ error: "Appointment not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Appointment deleted" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
