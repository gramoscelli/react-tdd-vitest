import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

// 4.2 Segundo Ciclo TDD: Agregar tareas
describe('TodoApp - Agregar tareas', () => {
  it('permite agregar una nueva tarea', async () => {
    const user = userEvent.setup();
    render(
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Tarea desde API 1')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Nueva tarea');
    const button = screen.getByText('Agregar');

    await user.type(input, 'Comprar leche');
    await user.click(button);

    expect(screen.getByText('Comprar leche')).toBeInTheDocument();
    expect(screen.getByText('Tarea desde API 1')).toBeInTheDocument();
  });
});
