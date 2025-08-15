import connectDB from "@/lib/db";

export async function GET() {
  await connectDB();
  return new Response(JSON.stringify({ message: "DB Connected!" }), {
    status: 200,
  });
}
