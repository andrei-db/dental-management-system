"use client";
import { useState } from "react";

export default function AddPatientModal({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setOpen(false);
    setForm({ name: "", email: "", phone: "", doctor:"" });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Add Doctor
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Add New Patient
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Patient Name"
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                required
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                required
              />

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                required
              />
              <input
                type="text"
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                placeholder="Specialization"
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                required
              />
              <input
                type="text"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Experience"
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
