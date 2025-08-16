"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setUser({ name: "Dr. John Doe", role: "admin" });
    }
  }, [router]);

  if (!user) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-600 p-6">
      <div className="max-w-5xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user.name} 👋
        </h1>
        <p className="text-gray-600 mb-6">Role: {user.role}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-100 rounded-lg text-center">
            <h2 className="text-xl text-black font-semibold">Patients</h2>
            <p className="text-gray-600">Manage patient records</p>
          </div>

          <div className="p-4 bg-green-100 rounded-lg text-center">
            <h2 className="text-xl text-black font-semibold">Appointments</h2>
            <p className="text-gray-600">View and schedule visits</p>
          </div>

          <div className="p-4 bg-purple-100 rounded-lg text-center">
            <h2 className="text-xl text-black font-semibold">Billing</h2>
            <p className="text-gray-600">Track payments & invoices</p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
