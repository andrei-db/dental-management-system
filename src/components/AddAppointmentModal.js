"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AddAppointmentModal({ onAdd, patients = [], doctors = [] }) {
  const [form, setForm] = useState({ patient: "", doctor: "", date: "", time: "", notes: "" });
  const [availableHours, setAvailableHours] = useState([]);


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ patient: "", doctor: "", date: "", time: "", notes: "" });
  };

    useEffect(() => {
    if (form.doctor && form.date && form.patient) {
      fetch(`/api/appointments/available?doctorId=${form.doctor}&patientId=${form.patient}&date=${form.date}`)
        .then((res) => {
          if (!res.ok) {
            return { available: [] };
          }
          return res.json();
        })
        .then((data) => setAvailableHours(data.available || []))
        .catch(() => setAvailableHours([]));
    }
  }, [form.doctor, form.date, form.patient]);

  return (
    <Dialog>
      <DialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Add Appointment
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <select
            name="patient"
            value={form.patient}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="" disabled hidden>
              Select Patient
            </option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>


          <select name="doctor" value={form.doctor} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="" disabled hidden>Select Doctor</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>

          <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border rounded px-3 py-2" required />

          <select
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="" disabled hidden>Select Time</option>
            {availableHours.map((hour) => (
              <option key={hour} value={hour}>{hour}</option>
            ))}
          </select>

          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="w-full border rounded px-3 py-2"></textarea>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Save Appointment
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
