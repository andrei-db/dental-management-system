"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddAppointmentModal({ onAdd, patients = [], doctors = [] }) {
  const [form, setForm] = useState({ patient: "", doctor: "", date: "", time: "", notes: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ patient: "", doctor: "", date: "", time: "", notes: "" });
  };

  const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

  return (
    <Dialog>
      <DialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        ➕ Add Appointment
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


          {/* Doctor */}
          <select name="doctor" value={form.doctor} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="" disabled hidden>Select Doctor</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>

          {/* Date */}
          <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border rounded px-3 py-2" required />

          {/* Time */}
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


          {/* Notes */}
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="w-full border rounded px-3 py-2"></textarea>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Save Appointment
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
