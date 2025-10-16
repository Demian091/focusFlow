function TaskInput({ currentTask, setCurrentTask }) {
  return (
    <div className="mb-6 w-full max-w-md">
      <input
        type="text"
        value={currentTask}
        onChange={(e) => setCurrentTask(e.target.value)}
        placeholder="What are you focusing on?"
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default TaskInput;
