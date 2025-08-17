import connectDB from "@/lib/db";
import Settings from "@/models/Settings";

export async function GET() {
  await connectDB();
  const settings = await Settings.findOne();

  const defaultSettings = {
    clinicName: "",
    email: "",
    theme: "light",
    workingHours: { start: "09:00", end: "17:00" },
  };

  return new Response(
    JSON.stringify(settings || defaultSettings),
    { status: 200 }
  );
}


export async function PUT(req) {
  await connectDB();
  const body = await req.json();

  const settings = await Settings.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });

  return new Response(JSON.stringify(settings), { status: 200 });
}
