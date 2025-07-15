import { useEffect, useState } from "react";
import { getAllPatients, addPatient, deletePatient, updatePatient } from "../api/patients";
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

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter((p) =>
  [p.name, p.email, p.phone]
    .join(" ")
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

  const startEdit = (patient: Patient) => {
    setEditingId(patient._id);
    setEditName(patient.name);
    setEditEmail(patient.email);
    setEditPhone(patient.phone);
  };
  const handleUpdate = async (id: string) => {
    try {
      const res = await updatePatient(id, {
        name: editName,
        email: editEmail,
        phone: editPhone,
      });

      setPatients(patients.map(p => p._id === id ? res.data : p));
      setEditingId(null);
    } catch (err) {
      alert("Failed to update patient.");
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this patient?")) return;

    try {
      await deletePatient(id);
      setPatients(patients.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete patient.");
      console.error(err);
    }
  };

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
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded w-full sm:w-1/2"
          />
        </div>

        <table className="w-full">
          {

            filteredPatients.map((p) => (
              <tr key={p._id}>
                {editingId === p._id ? (
                  <>
                    <td>
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />
                    </td>
                    <td>
                      <input
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />
                    </td>
                    <td>
                      <input
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />
                    </td>
                    <td className="space-x-2">
                      <button
                        onClick={() => handleUpdate(p._id)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-600 hover:underline text-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{p.name}</td>
                    <td>{p.email}</td>
                    <td>{p.phone}</td>
                    <td className="space-x-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          }
        </table>
      </div>
    </Sidebar>
  );
}
