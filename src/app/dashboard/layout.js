export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-80 bg-white shadow-lg text-gray-700">
        <div className="p-6 text-xl font-bold">🦷 Dental Admin</div>
        <nav className="p-4 space-y-2">
          <a href="/dashboard" className="block p-2 rounded hover:bg-gray-200">
            🏠 Dashboard
          </a>
          <a href="/dashboard/patients" className="block p-2 rounded hover:bg-gray-200">
            🧑‍⚕️ Patients
          </a>
          <a href="/dashboard/doctors" className="block p-2 rounded hover:bg-gray-200">
            💉 Doctors
          </a>
          <a href="/dashboard/appointments" className="block p-2 rounded hover:bg-gray-200">
            📅 Appointments
          </a>
          <a href="/dashboard/settings" className="block p-2 rounded hover:bg-gray-200">
            ⚙️ Settings
          </a>
        </nav>
      </aside>

    <div className="w-full">
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold"></h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Hello, Admin</span>
          <button className="bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
      
    </div>
  );
}
