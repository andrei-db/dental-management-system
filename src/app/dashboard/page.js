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

  if (!user) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name} 👋</h1>
      <p className="text-gray-600 mb-6">Role: {user.role}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Patients</h2>
          <p className="text-gray-600">Manage patient records</p>
        </div>

        <div className="p-4 bg-green-100 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Appointments</h2>
          <p className="text-gray-600">View and schedule visits</p>
        </div>

        <div className="p-4 bg-purple-100 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Billing</h2>
          <p className="text-gray-600">Track payments & invoices</p>
        </div>
      </div>
    </div>
  );
}
