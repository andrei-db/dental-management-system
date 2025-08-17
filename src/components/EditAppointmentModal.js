"use client";
import { useEffect, useState } from "react";

export default function EditAppointmentModal({ appointment, onUpdate, patients = [], doctors = [] }) {
  const [open, setOpen] = useState(false);
  const [availableHours, setAvailableHours] = useState([]);
  const [form, setForm] = useState({
    patient: appointment.patient?._id || "",
    doctor: appointment.doctor?._id || "",
    date: appointment.date || "",
    time: appointment.time || "",
    notes: appointment.notes || "",
  });

  useEffect(() => {
    if (form.doctor && form.date && form.patient) {
      fetch(
        `/api/appointments/available?doctorId=${form.doctor}&patientId=${form.patient}&date=${form.date}&excludeId=${appointment._id}`
      )
        .then((res) => res.json())
        .then((data) => {
          const currentTime = form.time;
          const hours = data.available.includes(currentTime)
            ? data.available
            : [...data.available, currentTime];

          setAvailableHours(hours.sort());
        });
    }
  }, [form.doctor, form.date, form.patient, form.time, appointment._id]);

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
                <option value="" disabled>Select Patient</option>
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
                <option value="" disabled>Select Doctor</option>
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
              >
                <option value="" disabled>Select Time</option>
                {availableHours.map((h) => (
                  <option key={h} value={h}>{h}</option>
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
