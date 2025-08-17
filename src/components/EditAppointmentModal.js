"use client";
import { useState, useEffect } from "react";

export default function EditAppointmentModal({ appointment, onUpdate, patients = [], doctors = [] }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        patient: "",
        doctor: "",
        date: "",
        time: "",
        notes: "",
    });

    useEffect(() => {
        if (appointment) {
            setForm({
                patient: appointment.patient?._id || appointment.patient || "",
                doctor: appointment.doctor?._id || appointment.doctor || "",
                date: appointment.date || "",
                time: appointment.time || "",
                notes: appointment.notes || "",
            });
        }
    }, [appointment]);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(appointment._id, form);
        setOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
            >
                Edit
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Edit Appointment</h2>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <select
                                name="patient"
                                value={form.patient}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="" disabled hidden>Select Patient</option>
                                {patients.map((p) => (
                                    <option key={p._id} value={p._id}>{p.name}</option>
                                ))}
                            </select>

                            <select
                                name="doctor"
                                value={form.doctor}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="" disabled hidden>Select Doctor</option>
                                {doctors.map((d) => (
                                    <option key={d._id} value={d._id}>{d.name}</option>
                                ))}
                            </select>

                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />

                            <select
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                                required
                            >
                                <option value="" disabled hidden>
                                    Select Time
                                </option>
                                {[
                                    "09:00",
                                    "10:00",
                                    "11:00",
                                    "12:00",
                                    "13:00",
                                    "14:00",
                                    "15:00",
                                    "16:00",
                                    "17:00",
                                ].map((hour) => (
                                    <option key={hour} value={hour}>
                                        {hour}
                                    </option>
                                ))}
                            </select>


                            <textarea
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                placeholder="Notes"
                                className="w-full border rounded px-3 py-2"
                            />

                            <div className="flex justify-end space-x-3">
                                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-200 rounded">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
