import { useState, useEffect } from "react";

export default function Timer({ onSessionComplete }) {
  const [time, setTime] = useState(0);
  const [inputMinutes, setInputMinutes] = useState("");
  const [topic, setTopic] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0 && isRunning) {
      handleComplete(); // auto-complete when countdown hits zero
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStartPause = () => setIsRunning((prev) => !prev);

  const handleReset = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  const handleSetTime = () => {
    const seconds = parseInt(inputMinutes) * 60;
    if (!seconds || seconds <= 0 || topic.trim() === "") return;
    setTime(seconds);
    setInitialTime(seconds);
  };

  const handleComplete = () => {
    if (topic && initialTime > 0) {
      const sessionData = {
        topic,
        duration: Math.floor((initialTime - time) / 60),
        timestamp: new Date().toLocaleTimeString(),
      };
      onSessionComplete(sessionData);
    }
    setIsRunning(false);
    setTime(initialTime);
    setTopic("");
    setInputMinutes("");
  };

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-900 p-6 rounded-2xl shadow-lg text-white w-full max-w-sm mx-auto">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="What are you focusing on?"
        className="p-2 rounded w-full bg-gray-800 text-white focus:outline-none"
      />

      <input
        type="number"
        value={inputMinutes}
        onChange={(e) => setInputMinutes(e.target.value)}
        placeholder="Set minutes"
        className="p-2 rounded w-full bg-gray-800 text-white focus:outline-none"
      />

      <button
        onClick={handleSetTime}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Set Timer
      </button>

      <div className="text-5xl font-mono mt-4">{`${minutes}:${seconds}`}</div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleStartPause}
          className={`px-4 py-2 rounded ${
            isRunning ? "bg-yellow-500" : "bg-green-500"
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          onClick={handleComplete}
          className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
        >
          Complete
        </button>
      </div>
    </div>
  );
}
