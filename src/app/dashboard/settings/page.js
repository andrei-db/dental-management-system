"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
  clinicName: "",
  email: "",
  theme: "light",
  workingHours: { start: "", end: "" },
});

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => console.log("No settings found, using defaults"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("workingHours")) {
      const key = name.split(".")[1];
      setSettings((prev) => ({
        ...prev,
        workingHours: { ...prev.workingHours, [key]: value },
      }));
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      alert("Settings saved!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings ⚙️</h1>

      <div className="space-y-4 max-w-lg">
        <div>
          <label className="block mb-1 font-semibold">Clinic Name</label>
          <input
            type="text"
            name="clinicName"
            value={settings.clinicName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Admin Email</label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Theme</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="light">Light 🌞</option>
            <option value="dark">Dark 🌙</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Working Hours</label>
          <div className="flex gap-4">
            <input
              type="time"
              name="workingHours.start"
              value={settings.workingHours.start}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <span className="self-center">to</span>
            <input
              type="time"
              name="workingHours.end"
              value={settings.workingHours.end}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
