import { createContext, useContext, useState, ReactNode } from 'react';

type Task = { id: number; text: string; done: boolean };

type TodoContextType = {
  tasks: Task[];
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [tasks] = useState<Task[]>([]);

  return (
    <TodoContext.Provider value={{ tasks }}>
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
