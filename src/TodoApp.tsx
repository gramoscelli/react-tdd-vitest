import { useEffect, useState } from 'react';
import { useTodos } from './TodoContext';

export default function TodoApp() {
  const { tasks, addTask, toggleTask, loadInitialTasks } = useTodos();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => loadInitialTasks(data))
      .catch(err => console.error('Error loading tasks:', err));
  }, [loadInitialTasks]);

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    addTask(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>

      <div>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAddTodo}>Agregar</button>
      </div>

      {tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => toggleTask(task.id)}
              style={{
                textDecoration: task.done ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {task.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
