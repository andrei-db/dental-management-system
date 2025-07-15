import { useEffect, useState } from "react";
import { getAllPatients, addPatient } from "../api/patients";
import Sidebar from "../components/Sidebar";
interface Patient {
  _id: string;
  name: string;
  email: string;
  phone: string;
}


export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getAllPatients();
        setPatients(res.data);
      } catch (err) {
        console.error("Failed to load patients:", err);
      }
    };

    fetchPatients();
  }, []);

  const handleAddPatient = async () => {
    if (!name) return;

    try {
      const res = await addPatient({ name, email, phone });
      setPatients([...patients, res.data]);
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      alert("Failed to add patient.");
      console.error(err);
    }
  };

  return (
    <Sidebar>
      <h2 className="text-2xl font-semibold mb-4">Patients</h2>


      <div className=" p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New Patient</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="border rounded px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddPatient}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Patient
        </button>
      </div>
      <div className=" p-4 rounded shadow">
        {patients.length === 0 ? (
          <p className="">No patients found.</p>
        ) : (
          <table className="w-full space-y-2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            {patients.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.phone}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </Sidebar>
  );
}
