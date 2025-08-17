"use client";
import { useState, useEffect } from "react";

export default function EditDoctorModal({ doctor, onUpdate }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: ""
    });

    useEffect(() => {
        if (doctor) {
            setForm({
                name: doctor.name,
                email: doctor.email,
                phone: doctor.phone,
                specialization: doctor.specialization,
                experience: doctor.experience
            });
        }
    }, [doctor]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onUpdate(doctor._id, form);
        setOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

            </button>

            {open && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-96">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Edit Doctor
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Doctor Name"
                                className="w-full px-3 py-2 border rounded focus:ring focus:ring-yellow-200"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full px-3 py-2 border rounded focus:ring focus:ring-yellow-200"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="w-full px-3 py-2 border rounded focus:ring focus:ring-yellow-200"
                            />
                            <input
                                type="text"
                                name="specialization"
                                value={form.specialization || ""}
                                onChange={handleChange}
                                placeholder="Specialization"
                                className="w-full px-3 py-2 border rounded focus:ring focus:ring-yellow-200"
                            />
                            <input
                                type="text"
                                name="experience"
                                value={form.experience || ""}
                                onChange={handleChange}
                                placeholder="Experience"
                                className="w-full px-3 py-2 border rounded focus:ring focus:ring-yellow-200"
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
                                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
