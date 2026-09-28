import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  http.get('/api/tasks', async () => {
    await delay(150);
    return HttpResponse.json([
      { id: 1, text: 'Tarea desde API 1', done: false },
      { id: 2, text: 'Tarea desde API 2', done: false },
      { id: 3, text: 'Tarea completada', done: true },
    ]);
  }),
];
