import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Timer from "./components/Timer";
import SessionHistory from "./components/SessionHistory";

export default function App() {
  const { user, logout } = useAuth(); // get user and logout from AuthContext

  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("focusFlowSessions");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist sessions in localStorage
  useEffect(() => {
    localStorage.setItem("focusFlowSessions", JSON.stringify(sessions));
  }, [sessions]);

  const handleSessionComplete = (session) => {
    setSessions((prev) => [...prev, session]);
  };

  const handleDeleteSession = (index) => {
    setSessions((prev) => prev.filter((_, i) => i !== index));
  };

  // If no authenticated user, show login screen
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">FocusFlow</h1>
        <Login />
      </div>
    );
  }

  // Logged-in UI (with logout button)
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10">
      <header className="w-full max-w-3xl px-6 mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">FocusFlow</h1>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">Signed in as <strong className="text-white ml-1">{user.email}</strong></span>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center space-y-8">
        <Timer onSessionComplete={handleSessionComplete} />
        <SessionHistory sessions={sessions} onDelete={handleDeleteSession} />
      </main>
    </div>
  );
}
