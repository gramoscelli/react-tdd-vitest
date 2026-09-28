import { render, screen } from '@testing-library/react';
import { TodoProvider } from '../src/TodoContext';
import TodoApp from '../src/TodoApp';

// 4.1 Primer Ciclo TDD: Test inicial para lista vacía
describe('TodoApp - Lista vacía', () => {
  it('muestra un mensaje cuando no hay tareas', () => {
    render(
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    );
    expect(screen.getByText('No hay tareas')).toBeInTheDocument();
  });
});
