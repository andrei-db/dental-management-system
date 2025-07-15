import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    children: ReactNode;
}

export default function Sidebar({ children }: Props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex">
            <aside className="bg-gray-950 fixed top-0 left-0 h-screen w-70 shadow-md flex flex-col justify-between p-4 z-10">
                <div>
                    <h1 className="font-bold mb-6">Dental</h1>
                    <nav className="space-y-2">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="w-full text-left px-3 py-2 rounded"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => navigate("/patients")}
                            className="w-full text-left px-3 py-2 rounded hover:bg-blue-100"
                        >
                            Patients
                        </button>
                    </nav>
                </div>
                <button
                    onClick={handleLogout}
                    className="font-medium hover:underline"
                >
                    Logout
                </button>
            </aside>
            <main className="ml-64 w-full min-h-screen p-6">
                {children}
            </main>
        </div>
    );
}
