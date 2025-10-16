const STORAGE_KEY = "focus_sessions";

export function getSessions() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export function saveSession(session) {
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}
