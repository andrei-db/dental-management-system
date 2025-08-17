import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const doctorId = searchParams.get("doctorId");
  const patientId = searchParams.get("patientId");
  const date = searchParams.get("date");
  const excludeId = searchParams.get("excludeId");

  if (!doctorId || !patientId || !date) {
    return new Response(JSON.stringify({ available: [] }), { status: 200 });
  }

  const query = { date };
  if (excludeId) query._id = { $ne: excludeId }; 

  const doctorAppointments = await Appointment.find({ doctor: doctorId, ...query });
  const patientAppointments = await Appointment.find({ patient: patientId, ...query });

  const takenHours = [
    ...doctorAppointments.map((a) => a.time),
    ...patientAppointments.map((a) => a.time),
  ];

  const allHours = Array.from({ length: 9 }, (_, i) => `${9 + i}:00`); 
  const available = allHours.filter((h) => !takenHours.includes(h));

  return new Response(JSON.stringify({ available }), { status: 200 });
}
