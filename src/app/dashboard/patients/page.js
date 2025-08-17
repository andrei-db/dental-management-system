"use client";
import { useEffect, useState } from "react";
import AddPatientModal from "@/components/AddPatientModal";
import EditPatientModal from "@/components/EditPatientModal";
import DeletePatientModal from "@/components/DeletePatientModal";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", doctor: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, []);

  const handleAddPatient = async (patientData) => {
    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData),
      });

      if (res.ok) {
        const newPatient = await res.json();
        setPatients([...patients, newPatient]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (id) => {
    const res = await fetch(`/api/patients/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPatients(patients.filter((p) => p._id !== id));
    }
  };


  return (
    <div className="text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patients</h1>
        <AddPatientModal onAdd={handleAddPatient} />
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Doctor</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id} className="border-t border-gray-200">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.email}</td>
              <td className="p-2">{p.phone}</td>
              <td className="p-2">{p.doctor}</td>
              <td className="flex p-2 space-x-2">
                <EditPatientModal
                  patient={p}
                  onUpdate={async (id, updatedData) => {
                    const res = await fetch(`/api/patients/${id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(updatedData),
                    });

                    if (res.ok) {
                      const updated = await res.json();
                      setPatients(patients.map((pat) => (pat._id === id ? updated : pat)));
                    }
                  }}
                />
                <DeletePatientModal onConfirm={() => handleDelete(p._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
