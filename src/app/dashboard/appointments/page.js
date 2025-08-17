"use client";
import { useEffect, useState } from "react";
import AddAppointmentModal from "@/components/AddAppointmentModal";
import EditAppointmentModal from "@/components/EditAppointmentModal";
import DeleteAppointmentModal from "@/components/DeleteAppointmentModal";

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch("/api/appointments")
            .then((res) => res.json())
            .then((data) => setAppointments(data));

        fetch("/api/patients")
            .then((res) => res.json())
            .then((data) => setPatients(data));

        fetch("/api/doctors")
            .then((res) => res.json())
            .then((data) => setDoctors(data));
    }, []);

    const handleAddAppointment = async (appt) => {
        const res = await fetch("/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appt),
        });

        if (res.ok) {
            const newAppt = await res.json();
            setAppointments([...appointments, newAppt]);
        }
    };

    return (
        <div className="text-black">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Appointments</h1>
                <AddAppointmentModal onAdd={handleAddAppointment} patients={patients} doctors={doctors} />
            </div>

            <table className="w-full bg-white rounded shadow">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="p-2">Patient</th>
                        <th className="p-2">Doctor</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Time</th>
                        <th className="p-2">Notes</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((a) => (
                        <tr key={a._id} className="border-t">
                            <td className="p-2">{a.patient?.name}</td>
                            <td className="p-2">{a.doctor?.name}</td>
                            <td className="p-2">{a.date}</td>
                            <td className="p-2">{a.time}</td>
                            <td className="p-2">{a.notes}</td>
                            <td className="flex space-x-2 p-2">
                                <EditAppointmentModal
                                    appointment={a}
                                    patients={patients}
                                    doctors={doctors}
                                    onUpdate={async (id, updatedData) => {
                                        const res = await fetch(`/api/appointments/${id}`, {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify(updatedData),
                                        });
                                        if (res.ok) {
                                            const updated = await res.json();
                                            setAppointments(appointments.map((appt) => (appt._id === id ? updated : appt)));
                                        }
                                    }}
                                />
                                <DeleteAppointmentModal
                                    onConfirm={async () => {
                                        const res = await fetch(`/api/appointments/${a._id}`, { method: "DELETE" });
                                        if (res.ok) {
                                            setAppointments(appointments.filter((appt) => appt._id !== a._id));
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
