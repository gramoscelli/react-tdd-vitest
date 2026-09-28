import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Task = { id: number; text: string; done: boolean };

type TodoContextType = {
  tasks: Task[];
  addTask: (text: string) => void;
  loadInitialTasks: (tasks: Task[]) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((text: string) => {
    setTasks(prev => [...prev, { id: Date.now(), text, done: false }]);
  }, []);

  const loadInitialTasks = useCallback((initialTasks: Task[]) => {
    setTasks(initialTasks);
  }, []);

  return (
    <TodoContext.Provider value={{ tasks, addTask, loadInitialTasks }}>
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
