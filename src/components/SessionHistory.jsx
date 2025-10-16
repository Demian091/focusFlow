export default function SessionHistory({ sessions, onDelete }) {
  return (
    <div className="mt-8 w-full max-w-md bg-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Session History</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-400">No sessions yet.</p>
      ) : (
        <ul className="space-y-2">
          {sessions.map((s, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-800 p-2 rounded"
            >
              <span>
                <strong>{s.topic}</strong> — {s.timestamp}
              </span>
              <button
                onClick={() => onDelete(i)}
                className="text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
