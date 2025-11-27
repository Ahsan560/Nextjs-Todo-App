'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, newTask.trim()]);
    setNewTask('');
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-start p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-400 tracking-wide">
        🌙 Dark Mode To-Do App
      </h1>

      {/* Input & Add button */}
      <div className="flex w-full max-w-lg mb-8">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-3 rounded-l-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={addTask}
          className="p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-r-lg font-semibold transition-all duration-200"
        >
          Add Task
        </button>
      </div>

      {/* Task list */}
      {tasks.length === 0 ? (
        <p className="text-gray-400 text-lg">No tasks yet. Add one above!</p>
      ) : (
        <ul className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg divide-y divide-gray-700">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="text-gray-200 font-medium">{task}</span>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-400 font-bold transition-colors duration-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Footer */}
      <p className="mt-12 text-gray-500 text-sm">
        Made with ❤️ using Next.js & TypeScript
      </p>
    </div>
  );
}
