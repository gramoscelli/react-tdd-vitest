import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Task = { id: number; text: string; done: boolean };

type TodoContextType = {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  loadInitialTasks: (tasks: Task[]) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((text: string) => {
    setTasks(prev => [...prev, { id: Date.now(), text, done: false }]);
  }, []);

  const toggleTask = useCallback((id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const loadInitialTasks = useCallback((initialTasks: Task[]) => {
    setTasks(initialTasks);
  }, []);

  return (
    <TodoContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, loadInitialTasks }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
