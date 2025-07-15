import Sidebar from "../components/Sidebar";
export default function Dashboard() {
  return (
    <Sidebar>
      <h2 className="text-3xl font-semibold mb-4">Welcome to your dashboard!</h2>
      <p className="text-gray-700">Here will go appointments, patients, stats, etc.</p>
    </Sidebar>
  );
}
