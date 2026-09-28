import { useTodos } from './TodoContext';

export default function TodoApp() {
  const { tasks } = useTodos();

  return (
    <div>
      <h1>Lista de Tareas</h1>

      {tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
