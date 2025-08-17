"use client";
import { useEffect, useState } from "react";
import AddDoctorModal from "@/components/AddDoctorModal";
import EditDoctorModal from "@/components/EditDoctorModal";
import DeleteDoctorModal from "@/components/DeleteDoctorModal";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  const handleAddDoctor = async (doctorData) => {
    const res = await fetch("/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctorData),
    });

    if (res.ok) {
      const newDoctor = await res.json();
      setDoctors([...doctors, newDoctor]);
    }
  };

  const handleUpdateDoctor = async (id, updatedData) => {
    const res = await fetch(`/api/doctors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      const updated = await res.json();
      setDoctors(doctors.map((d) => (d._id === id ? updated : d)));
    }
  };

  const handleDeleteDoctor = async (id) => {
    const res = await fetch(`/api/doctors/${id}`, { method: "DELETE" });
    if (res.ok) {
      setDoctors(doctors.filter((d) => d._id !== id));
    }
  };

  return (
    <div className="text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Doctors</h1>
        <AddDoctorModal onAdd={handleAddDoctor} />
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Specialization</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Experience</th>
            <th className="p-2">Next Available</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d._id} className="border-t border-gray-200">
              <td className="p-2">{d.name}</td>
              <td className="p-2">{d.specialization}</td>
              <td className="p-2">{d.email}</td>
              <td className="p-2">{d.phone}</td>
              <td className="p-2">{d.experience} yrs</td>
              <td className="p-2">{d.nextAvailable ? new Date(d.nextAvailable).toLocaleDateString() : "N/A"}</td>
              <td className="flex p-2 space-x-2">
                <EditDoctorModal doctor={d} onUpdate={handleUpdateDoctor} />
                <DeleteDoctorModal onConfirm={() => handleDeleteDoctor(d._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
