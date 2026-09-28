import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoProvider } from '../src/TodoContext';
import TodoApp from '../src/TodoApp';
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';

describe('TodoApp - Test de integración con API y Contexto', () => {
  it('carga las tareas desde la API y las muestra', async () => {
    render(
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Tarea desde API 1')).toBeInTheDocument();
      expect(screen.getByText('Tarea desde API 2')).toBeInTheDocument();
      expect(screen.getByText('Tarea completada')).toBeInTheDocument();
    });
  });

  it('la tarea completada desde la API aparece tachada', async () => {
    render(
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Tarea completada')).toHaveStyle({
        textDecoration: 'line-through',
      });
    });
  });

  it('permite alternar el estado de una tarea cargada desde la API', async () => {
    const user = userEvent.setup();

    render(
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Tarea desde API 1')).toBeInTheDocument();
    });

    const tarea = screen.getByText('Tarea desde API 1');
    expect(tarea).toHaveStyle({ textDecoration: 'none' });

    await user.click(tarea);
    expect(tarea).toHaveStyle({ textDecoration: 'line-through' });

    await user.click(tarea);
    expect(tarea).toHaveStyle({ textDecoration: 'none' });
  });

  it('permite agregar una nueva tarea junto a las cargadas desde la API', async () => {
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

    await user.type(input, 'Nueva tarea local');
    await user.click(button);

    expect(screen.getByText('Nueva tarea local')).toBeInTheDocument();
    expect(screen.getByText('Tarea desde API 1')).toBeInTheDocument();
  });

  it('muestra lista vacía cuando la API devuelve un array vacío', async () => {
    server.use(
      http.get('/api/tasks', () => {
        return HttpResponse.json([]);
      })
    );

    render(
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('No hay tareas')).toBeInTheDocument();
    });

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
