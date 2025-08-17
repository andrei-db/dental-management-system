import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(params.id, await req.json(), { new: true });
    return new Response(JSON.stringify(updatedDoctor), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    await Doctor.findByIdAndDelete(params.id);
    return new Response(JSON.stringify({ message: "Doctor deleted" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
